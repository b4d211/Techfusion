import { Link } from "react-router-dom";
import Logo from "../../images/LogoTi.png"
import style from "../Header/style.module.css"
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  return (
    <header>
      <div className={style.logo}>
        <img src={Logo} alt="" />
        <h1>TechFusion</h1>
      </div>
      <nav className={style.Links}>
        <Link className={style.Link} to="/">Inicio</Link>
        <Link className={style.Link} to="/produtos">Produtos</Link>
        <Link className={style.Link} to="/categorias">Categorias</Link>
      </nav>
      <div className={style.busca}>
        <IoIosSearch size={20} color='#1D25A1' />
        <input type="text" placeholder='Search...' />
      </div>
    </header>
  )
}