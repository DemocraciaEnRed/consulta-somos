import React, { Component } from 'react'

export default ({ nodes }) => (
  <div className='lateral-bar-container'>
  {console.log(nodes)}
    <ul className='lateral-bar-list'>
        <li className='lateral-bar-item'><a href=''>Archivos y Derechos Humanos</a></li>
        <li className='lateral-bar-item'><a href=''>Introducción</a></li>
        <li className='lateral-bar-item'><a href=''>Votá en la consulta</a></li>
        <li className='lateral-bar-item'><a href=''>Objetivos principales</a></li>
        <li className='lateral-bar-item'><a href=''>Por qué realizamos esta consulta</a></li>
        <li className='lateral-bar-item'><a href=''>Comentarios</a></li>
    </ul>
  </div>
)
