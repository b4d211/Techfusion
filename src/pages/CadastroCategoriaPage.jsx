import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const isValid = nome.trim().length >= 3; 

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      await api.post("/categories", {
        name: nome.trim(),
        description: descricao.trim() || null,
        imageUrl: imageUrl.trim() || null,
      });

      navigate("/categorias");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Erro ao salvar categoria.";
      setErro(msg);
      console.error(err);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de categoria</h2>

        {erro && (
          <div
            role="alert"
            style={{ color: "#b00020", marginBottom: 12 }}
            aria-live="polite"
          >
            {erro}
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
          type="url"
          id="imageUrl"
          placeholder="https://exemplo.com/minha-imagem.png"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="botoes" style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button type="button" onClick={() => navigate(-1)} disabled={salvando}>
            Cancelar
          </button>
          <button type="submit" disabled={!isValid || salvando}>
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </>
  );
}
