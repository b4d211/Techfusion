import style from '../styles/editarCategoria.module.css';
import imageEditar from '../images/editarcategoria.png';
import { LuSave } from "react-icons/lu";
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
  const [imageFile, setImageFile] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [removendo, setRemovendo] = useState(false);

  const isValid = nome.trim().length >= 3;

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const res = await api.get(`/categorias/${id}`);
        if (!ativo) return;
        setNome(res.data.name ?? "");
        setDescricao(res.data.description ?? "");
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
      const formData = new FormData();
      formData.append("name", nome.trim());
      formData.append("description", descricao.trim() || "");
      if (imageFile) formData.append("image", imageFile);

      await api.put(`/categorias/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/categorias");
    } catch (err) {
      setErro(getError(err));
    } finally {
      setSalvando(false);
    }
  }



  if (carregando) return <p>Carregando...</p>;
  if (erro?.status === 404) return <h1>Categoria não encontrada</h1>;

  return (
    <>
      <Header />
      <div className={style.containerTudo}>
        <div className={style.containerEditar}>
          <img src={imageEditar} alt="" />
          <form onSubmit={editarCategoria}>
            <h2>Editar categoria</h2>

            <div className={style.nomeDiv}>
              <label className={style.label} htmlFor="nome">Nome</label>
              <input
                type="text"
                className={style.nome}
                id="nome"
                placeholder="Digite um nome de categoria"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={style.descDiv}>
              <label className={style.label} htmlFor="descricao">Descrição</label>
              <textarea
                name="descricao"
                id="descricao"
                value={descricao}
                placeholder="Digite uma descrição"
                onChange={(e) => setDescricao(e.target.value)}
                className={style.area}
              />

              <label htmlFor="imageUrl">Imagem da categoria (opcional)</label>
              <input
                type="file"
                id="imageUrl"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <div className={style.botoes}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={style.botaoCancelar}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!isValid || salvando}
                className={style.botaoSalvar}
              >
                {salvando ? "Salvando..." : "Salvar"}
                <LuSave color="white" />
              </button>


            </div>

            {erro && <p style={{ color: "red" }}>{erro.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
