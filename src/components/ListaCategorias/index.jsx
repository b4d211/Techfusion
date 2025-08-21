import React from 'react';
import style from './style.module.css';
import { Link } from "react-router-dom";
import ConsoleCateg from "../../images/ConsoleCateg.png"
import ConsoleCateg2 from "../../images/ConsoleCateg2.png"

export default function Hero() {
  return (
    <>
      <div className={style.container}>
        <img src={ConsoleCateg} alt="" />
        <div className={style.texto}>
          <h1>Console</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
      </div>
      <div className={style.container2}>
        <div className={style.texto2}>
          <h1>PCs</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
        <img src={ConsoleCateg2} alt="" />
      </div>
      <div className={style.container}>
        <img src={ConsoleCateg} alt="" />
        <div className={style.texto}>
          <h1>Console</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
      </div>
      <div className={style.container2}>
        <div className={style.texto2}>
          <h1>PCs</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
        <img src={ConsoleCateg2} alt="" />
      </div>
      <div className={style.container}>
        <img src={ConsoleCateg} alt="" />
        <div className={style.texto}>
          <h1>Console</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
      </div>
      <div className={style.container2}>
        <div className={style.texto2}>
          <h1>PCs</h1>
          <li>Garantia</li>
          <li>Melhores preços</li>
          <li>Lançamentos</li>
          <Link to="/produtos">Ver Produtos</Link>
        </div>
        <img src={ConsoleCateg2} alt="" />
      </div>
    </>
  );
}

