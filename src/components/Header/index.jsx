import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/LogoTi.png"
import style from "../Header/style.module.css"
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length >= 3) {
      // Atualiza a URL com o termo da busca
      navigate(`/produtos?busca=${encodeURIComponent(search)}`);
    } else if (search.length === 0 && location.pathname === "/produtos") {
      // Se limpar a busca, remove o parâmetro
      navigate("/produtos");
    }
  }, [search, navigate, location.pathname]);

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
        <input
          type="text"
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}
