import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import pngCadastro from "../images/adicionarcategoria.png";
import style from "../styles/cadastroCateg.module.css";
import { LuSave } from "react-icons/lu";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState(null);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const isValid = nome.trim().length >= 3;

  // Função para salvar categoria
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      const formData = new FormData();
      formData.append("name", nome.trim());
      formData.append("description", descricao.trim()); // sempre string
      if (image) {
        formData.append("image", image);
      }

      await api.post("/categorias", formData);

      // reseta os campos
      setNome("");
      setDescricao("");
      setImage(null);

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

  // Atualiza imagem
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  return (
    <>
      <Header />
      <div className={style.containerTudo}>
        <div className={style.containerCadastro}>
          <img src={pngCadastro} alt="Imagem ilustrativa" />

          <form onSubmit={handleSubmit}>
            <h2>Cadastro de categoria</h2>

            {/* Campo Nome */}
            <div className={style.nomeDiv}>
              <label className={style.label} htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Digite um nome de categoria"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={style.nome}
              />
            </div>

            {/* Campo Descrição */}
            <div className={style.descDiv}>
              <label className={style.label} htmlFor="descricao">Descrição</label>
              <textarea
                className={style.area}
                name="descricao"
                id="descricao"
                value={descricao}
                placeholder="Digite uma descrição"
                onChange={(e) => setDescricao(e.target.value)}
              />

              {/* Upload de imagem */}
              <label htmlFor="image">Imagem (opcional)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Mensagem de erro */}
            {erro && <p className={style.erro}>{erro}</p>}

            {/* Botões */}
            <div className={style.botoes}>
              <button
                type="button"
                className={style.botaoCancelar}
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!isValid}
                className={style.botaoSalvar}
              >
                Salvar
                {/* {salvando ? "Salvando..." : "Salvar"} */}
                <LuSave color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
