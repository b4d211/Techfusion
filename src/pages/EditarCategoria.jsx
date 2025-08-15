import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import style from '../styles/editarCategoria.module.css'
import imageEditar from '../images/editarcategoria.png'
import { LuSave } from "react-icons/lu";


const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function EditarCategoria() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("");

  const { id } = useParams();

  async function editarCategoria(e) {
    e.preventDefault();
    try {
      await api.put(`/categorias/${id}`, {
        name: nome,
        description: descricao
      })
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
      console.log(erro);
    }
  }

  async function deletarCategoria() {
    if (!window.confirm
      ("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${id}`)
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          const res = await api.get(`/categorias/${id}`);
          setNome(res.data.name);
          setDescricao(res.data.description);
        } catch (err) {
          setErro(err)
        }
      }
    )()
  }, [id])

  const navigate = useNavigate()

  const isValid =
    nome.trim() !== "" && descricao.trim() !== "";

  if (erro.response?.status === 404) {
    return (
      <h1>Categoria não encontrada</h1>
    )
  }

  return (
    <>
      <Header />
      <div className={style.containerTudo}>
        <div className={style.containerEditar}>
          <img src={imageEditar} alt="" />
          <form action="" onSubmit={editarCategoria}>
            <h2>Editar categoria</h2>
            <div className={style.nomeDiv}>
              <label className={style.label} htmlFor="nome">nome</label>
              <input type="text" className={style.nome}
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
                required
                className={style.area}
              />
            </div>
            <div className={style.botoes}>
              <button type="button"
                onClick={() => navigate(-1)} className={style.botaoCancelar}
              >
                Cancelar
              </button>
              <button type="submit" disabled={!isValid} className={style.botaoSalvar}>
                Salvar
                <LuSave color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
