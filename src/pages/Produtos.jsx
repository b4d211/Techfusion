import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';
import style from '../styles/produtos.module.css';
import { FaPlus } from 'react-icons/fa';
import Rodape from '../components/Rodape'

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  useEffect(() => {
    api.get("/produtos")
      .then(res => setProdutos(res.data))
      .catch(err => console.log("Erro ao buscar os produtos", err));
  }, [api]);

  const produtosFiltrados = busca.trim()
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

      {/* <input
        type="text"
        placeholder='Buscar produto'
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      /> */}


      <div className={style.containerProdutos}>
        <div className={style.containerProdutosGrid}>
          {produtosFiltrados.length === 0 ? (
            <p>Nenhum produto foi cadastrado.</p>
          ) : (
            produtosFiltrados.map(produto => (
              <div className={style.produto} key={produto.id}>
                <img
                  src={`http://localhost:3333${produto.imageUrl}`}
                  alt={produto.name}
                  width={100}
                />
                <div className={style.infoProduto}>
                  {/* <p>ID: {produto.id}</p> */}
                  <p className={style.nomeProduto}> {produto.name}</p>
                  <p className={style.categProduto}> {produto.category?.name || 'Sem categoria'}</p>
                  <p className={style.descProduto}> {produto.description}</p>
                  <div className={style.infoPreco}>
                    <p className={style.preco}> R$ {produto.price.toFixed(2)}</p>
                    <p className={style.quantidadeProduto}><span>Disponiveis:</span> {produto.quantity}</p>
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

<Rodape/>
    </div>
  );
}
