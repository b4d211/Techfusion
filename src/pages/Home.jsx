import Header from "../components/Header";
import Rodape from "../components/Rodape";
import Hero from "../components/Hero";
import Recursos from "../components/Recursos";
import ListaCategorias from "../components/ListaCategorias";
import Carrosel3 from "../components/Carrosel3Novo";
import axios from "axios"; // você esqueceu de importar no código que me passou
import { useEffect, useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  useEffect(() => {
    api.get("/produtos")
      .then(res => {
        setProdutos(res.data);
      })
      .catch(err => console.log("Erro ao buscar os produtos", err));
  }, []); // adicionei [] para evitar chamadas infinitas

  return (
    <>
      <Header />
      <Hero />
      <Recursos />
      <ListaCategorias />
      <Carrosel3 titulo="Nossos Produtos" data={produtos} />
      <Rodape />
    </>
  );
}