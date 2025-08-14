import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header'
import ConsoleBanner from '../images/Banner/ConsoleBanner.png'
import axios from 'axios';
import style from "../styles/categorias.style.module.css"
export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState('');
  const api = axios.create({
    baseURL: "http://localhost:3333"
  })
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
            <img src={ConsoleBanner} alt="" />
            <p>{categoria.name}</p>
            </div>
            <div key={categoria.id}>
              <p>{categoria.id}</p>
              <p>{categoria.description}</p>
              <Link to={`/editar-categoria/${categoria.id}`}>
                Editar
              </Link>
            </div>
          </div>
        ))
      )}

    </>
  );
}
