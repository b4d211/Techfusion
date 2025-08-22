import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header'
import ConsoleBanner from '../images/Banner/ConsoleBanner.png'
import Rodape from "../components/Rodape";
import axios from 'axios';
import style from "../styles/categorias.style.module.css";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState("");
  const api = axios.create({
    baseURL: "http://localhost:3333"
  })

  console.log(categorias);


  useEffect(() => {
    api.get("/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.log("Erro ao buscar as categorias", err)
      )
  }, [api])

  const categoriasFiltradas = busca.trim()
    ? categorias.filter(categoria =>
      categoria.name.toLowerCase()
        .includes(busca.toLowerCase())
    )
    : categorias;
  async function deletarCategoria(id) {
    if (!window.confirm
      ("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${ id }`)
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
    }
  }
  return (
    <>
      <Header />
      <div className={style.categoriaTitulo}>
        <h1>Categorias</h1>
        <Link to="/cadastrar-categoria">
          Adicionar uma categoria +
        </Link>
      </div>
      {categoriasFiltradas.length === 0 ? (
        <p>Nenhuma categoria foi cadastrada.</p>
      ) : (
        categoriasFiltradas.map(categoria => (
          <div className={style.card}>
            <div className={style.bannerTexto}>
              <img src={`http://localhost:3333${categoria.imageUrl}`} alt="" />
              <p>{categoria.name}</p>
            </div>
            <div className={style.cardDescricao} key={categoria.id}>
              <button className={style.delet} onClick={() => deletarCategoria(categoria.id)}> <FaRegTrashAlt size="25px" /> </button>
              <Link className='' to={`/editar-categoria/${categoria.id}`}>
                Editar
              </Link>
              <Link className={style.ver} to={`/produtos/`}>
                Ver Produtos
              </Link>
            </div>
          </div>

        ))
      )}
      <Rodape />
    </>
  );
}

