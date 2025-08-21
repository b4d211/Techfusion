import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const api = axios.create({ baseURL: "http://localhost:3333" });

function getError(err) {
  return {
    status: err?.response?.status,
    message:
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Erro inesperado.",
  };
}

export default function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [erro, setErro] = useState(null);      // { status, message } | null
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [removendo, setRemovendo] = useState(false);

  const isValid = nome.trim().length >= 3; // description é opcional no schema

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        if (!ativo) return;
        setNome(res.data.name ?? "");
        setDescricao(res.data.description ?? "");
        setImageUrl(res.data.imageUrl ?? "");
        setErro(null);
      } catch (err) {
        if (!ativo) return;
        setErro(getError(err));
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => { ativo = false; };
  }, [id]);

  async function editarCategoria(e) {
    e.preventDefault();
    if (!isValid) return;
    setSalvando(true);
    setErro(null);
    try {
      await api.put(`/categories/${id}`, {
        name: nome.trim(),
        description: descricao.trim() || null,
        imageUrl: imageUrl.trim() || null,
      });
      navigate("/categorias"); // tua rota de listagem no front
    } catch (err) {
      setErro(getError(err));
    } finally {
      setSalvando(false);
    }
  }

  async function deletarCategoria() {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    setRemovendo(true);
    setErro(null);
    try {
      await api.delete(`/categories/${id}`);
      navigate("/categorias");
    } catch (err) {
      setErro(getError(err));
    } finally {
      setRemovendo(false);
    }
  }

  if (carregando) return <p>Carregando...</p>;

  if (erro?.status === 404) {
    return <h1>Categoria não encontrada</h1>;
  }

  return (
    <>
      <Header />
      <form onSubmit={editarCategoria}>
        <h2>Editar categoria</h2>

        {erro && (
          <div role="alert" style={{ color: "#b00020", marginBottom: 12 }} aria-live="polite">
            {erro.message}
          </div>
        )}

        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite um nome de categoria"
          required
          minLength={3}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="descricao">Descrição (opcional)</label>
        <textarea
          id="descricao"
          value={descricao}
          placeholder="Digite uma descrição"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="imageUrl">URL da imagem (opcional)</label>
        <input
          type="file"
          id="imageUrl"
          placeholder="https://exemplo.com/minha-imagem.png"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="botoes" style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button type="button" onClick={() => navigate(-1)} disabled={salvando || removendo}>
            Cancelar
          </button>
          <button type="submit" disabled={!isValid || salvando || removendo}>
            {salvando ? "Salvando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={deletarCategoria}
            disabled={salvando || removendo}
            aria-label="Excluir categoria"
          >
            {removendo ? "Excluindo..." : "Deletar Categoria"}
          </button>
        </div>
      </form>
    </>
  );
}
