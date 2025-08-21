import Header from "../components/Header";
import Rodape from "../components/Rodape";
import Hero from "../components/Hero";
import Recursos from "../components/Recursos";
import ListaCategorias from "../components/ListaCategorias";
import style from "../styles/style.module.css"

export default function Home() {
  return (
    <>
        <Header />
        <Hero />
        <Recursos />
        <ListaCategorias />
        <Rodape />
    </>
  );
}
