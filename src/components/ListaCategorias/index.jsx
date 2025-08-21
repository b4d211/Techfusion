import React from 'react';
import style from './style.module.css';
import ConsoleCateg from "../../images/ConsoleCateg.png"

export default function Hero() {
  return (
   <>
   <div className={style.container}>
    <img src={ConsoleCateg} alt="" />
    <h1>Console</h1>
    </div>
   </>
  );
}
