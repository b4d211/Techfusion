import Header from "../components/Header";
import Rodape from "../components/Rodape";
import Hero from "../components/Hero";
import Recursos from "../components/Recursos";
import style from "../styles/style.module.css"

export default function Home() {
  return (
    <>
        <Header />
        <Hero />
        <Recursos />
        <h1>Home</h1>
        <Rodape />
    </>
  );
}
