import React from 'react';
import style from './style.module.css';
import Logo from "../../images/LogoTi.png"

export default function Hero() {
  return (
    <section className={style.hero}>
      <div className={style.conteudo}>
         <img src={Logo} alt="" />
         <h1 className={style.titulo}>SEJA BEM VINDO!</h1>
        <p className={style.descricao}>Tudo que você procura você encontra aqui </p>
      </div>
    </section>
  );
}
