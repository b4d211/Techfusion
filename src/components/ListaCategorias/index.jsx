import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Hero() {
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  useEffect(() => {
    api.get("/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.log("Erro ao buscar as categorias", err));
  }, [api]);

  const categoriasFiltradas = busca.trim()
    ? categorias.filter(categoria =>
        categoria.name.toLowerCase().includes(busca.toLowerCase())
      )
    : categorias;

  async function deletarCategoria(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${id}`);
      navigate("/categorias");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <>
      {categoriasFiltradas.length === 0 ? (
        <p>Nenhuma categoria foi cadastrada.</p>
      ) : (
        categoriasFiltradas.map((categoria, index) => (
          <div
            className={index % 2 === 0 ? style.container : style.container2}
            key={categoria.id}
          >
            <img src={`http://localhost:3333${categoria.imageUrl}`} alt="" />
            
            <div className={index % 2 === 0 ? style.texto : style.texto2}>
              <h1>{categoria.name}</h1>
              <div className={index % 2 === 0 ? style.descricao : style.descricao2}>
              <li>Garantia</li>
              <li>Melhores preços</li>
              <li>Lançamentos</li>
              </div>
              <Link to="/produtos">Ver Produtos</Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
