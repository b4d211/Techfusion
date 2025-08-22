import sty from './style.module.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function Carrosel3({ titulo = "Produtos em destaque", data = [] }) {
  const [indice, setIndice] = useState(0);
  const total = data.length;

  useEffect(() => {
    setIndice(0);
  }, [data]);

  function proximaImagem() {
    setIndice((prev) => ajustarIndice(prev + 1));
  }

  function imagemAnterior() {
    setIndice((prev) => ajustarIndice(prev - 1));
  }

  function ajustarIndice(valor) {
    return total > 0 ? (valor + total) % total : 0;
  }

  // se não tiver produtos, não renderiza carrossel
  if (total === 0) {
    return null;
  }

  const itensParaExibir = Math.min(3, total);
  const itens = Array.from({ length: itensParaExibir }, (_, i) =>
    data[ajustarIndice(indice + i)]
  );

  return (
    <div className={sty.secaoCarrossel}>
      <h1 className={sty.tituloSerie}>Recentes</h1>
      <div className={sty.carrossel}>
        <button onClick={imagemAnterior} className={sty.btnmover}>
          <FaAngleLeft color="#232323" size={40} />
        </button>

        <div className={sty.carrosselItens}>
         {itens.map((produto, index) => (

            <div className={sty.item} key={produto.id || index}>
              <img
                src={`http://localhost:3333${produto.imageUrl}`}
                alt={produto.name}
              />
              <div className={sty.informacaoCarrosel}>
                <h3>{produto.name}</h3>
                <p>{produto.description}</p>
                <p className={sty.preco}>R$ {produto.price.toFixed(2)}</p>
                <Link  to={`/editar-produto/${produto.id}`}> Editar</Link>
              </div>
            </div>
          ))}
        </div>

        <button onClick={proximaImagem} className={sty.btnmover}>
          <FaAngleRight color="#232323" size={40} />
        </button>
      </div>
    </div>
  );
}
