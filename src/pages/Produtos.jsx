import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';
import style from '../styles/produtos.module.css';
import { FaPlus } from 'react-icons/fa';
import Rodape from '../components/Rodape'

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const busca = params.get("busca") || "";

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  useEffect(() => {
    api.get("/produtos")
      .then(res => setProdutos(res.data))
      .catch(err => console.log("Erro ao buscar os produtos", err));
  }, []);

  const produtosFiltrados = busca.length >= 3
    ? produtos.filter(produto =>
        produto.name.toLowerCase().includes(busca.toLowerCase())
      )
    : produtos;

  return (
    <div className={style.containerTudo}>
      <Header />
      <div className={style.caixaTop}>
        <h1 className={style.tituloPage}>Produtos</h1>
        <Link className={style.botaoAddProduto} to="/cadastrar-produto">
          Adicionar um produto
          <FaPlus />
        </Link>
      </div>

      <div className={style.containerProdutos}>
        <div className={style.containerProdutosGrid}>
          {produtosFiltrados.length === 0 ? (
            <p>{busca.length >= 3 ? "Nenhum produto encontrado." : "Digite pelo menos 3 letras para buscar."}</p>
          ) : (
            produtosFiltrados.map(produto => (
              <div className={style.produto} key={produto.id}>
                <img
                  src={`http://localhost:3333${produto.imageUrl}`}
                  alt={produto.name}
                  width={100}
                />
                <div className={style.infoProduto}>
                  <p className={style.nomeProduto}> {produto.name}</p>
                  <p className={style.categProduto}> {produto.category?.name || 'Sem categoria'}</p>
                  <p className={style.descProduto}> {produto.description}</p>
                  <div className={style.infoPreco}>
                    <p className={style.preco}> R$ {produto.price.toFixed(2)}</p>
                    <p className={style.quantidadeProduto}><span>Disponíveis:</span> {produto.quantity}</p>
                  </div>
                </div>
                <Link className={style.editar} to={`/editar-produto/${produto.id}`}>
                  Editar
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <Rodape />
    </div>
  );
}
