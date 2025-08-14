import React from 'react';
import style from './style.module.css';
import {FaGamepad, FaNewspaper, FaUsers } from 'react-icons/fa';

export default function Recursos() {
  return (
    <section className={style.secaoRecursos}>

      <div className={style.listaRecursos}>
        <div className={style.recurso}>
          <FaGamepad className={style.icone} />
          <p>
           534 Itens disponiveis no estoque 
          </p>
        </div>

        <div className={style.recurso}>
          <FaNewspaper className={style.icone} />
          <p>
            Aqui Você encontra todos os produtos da sua loja.
          </p>
        </div>

        <div className={style.recurso}>
          <FaUsers className={style.icone} />
          <p>
            Entrega rapida e com garantia
          </p>
        </div>

      </div>
    </section>
  );
}
