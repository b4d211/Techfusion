import React from "react";
import LogoA from "../../images/LogoAzul.png"
import { FaFacebook, FaTwitter, FaYoutube, FaTwitch } from "react-icons/fa";
import style from "./style.module.css";

function Rodape() {
  return (
    <footer className={style.rodape}>
      <img src={LogoA} alt="" />
      <h1>TechFusion</h1>
      <div className={style.redesSociais}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube size={24} />
        </a>
        <a href="https://twitch.tv" target="_blank" rel="noreferrer">
          <FaTwitch size={24} />
        </a>
      </div>
      <div className={style.final}>
      <p>Todos Direitos Reservados  a</p><a href="/">TechFusion©</a></div>
    </footer>
  );
}

export default Rodape;
