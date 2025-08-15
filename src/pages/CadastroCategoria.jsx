import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import pngCadastro from '../images/adicionarcategoria.png'
import style from '../styles/cadastroCateg.module.css'
import { FaRegTrashCan } from "react-icons/fa6";
import { LuSave } from "react-icons/lu";


const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function CadastroCategoria() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  const navigate = useNavigate()

  const isValid =
    nome.trim() !== "" && descricao.trim() !== "";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("categorias", {
        name: nome,
        description: descricao
      })
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
      console.log(erro);
    }
  }
  return (
    <>
      <Header />
      <div className={style.containerTudo}>
        <div className={style.containerCadastro}>
          <img src={pngCadastro} alt="" />

          <form action="" onSubmit={handleSubmit}>
            <h2>Cadastro de categoria</h2>
            <div className={style.nomeDiv}>
              <label className={style.label} htmlFor="nome">Nome</label>
              <input type="text"
                id="nome"
                placeholder="Digite um nome de categoria"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={style.nome}
              />
            </div>
            <div className={style.descDiv}>
              <label className={style.label} htmlFor="descricao">Descrição</label>
              <textarea className={style.area}
                name="descricao"
                id="descricao"
                value={descricao}
                placeholder="Digite uma descrição"
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className={style.botoes}>
              <button type="button" className={style.botaoCancelar}
                onClick={() => navigate(-1)}
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
