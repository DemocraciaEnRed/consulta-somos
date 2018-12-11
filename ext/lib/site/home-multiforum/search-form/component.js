import React from 'react'

export default () => ( 

<div className='searchbar-container'>

  <div className='searchbar'>
    <input type="text" name="search" placeholder="" />
    <button type="submit"><i className='icon-find' />Buscar</button>
  </div>

  <div className='advancedsearch'>

    <div className='button-link'>
    <a href="" className="reiniciar">Reiniciar búsqueda</a>
    </div>

    <div className="">
    <legend>Buscar por</legend>
        <label for="todos_resultados">
          <input id="todos_resultados" name="todos_resultados" type="checkbox" value="" />Todos los resultados
        </label>
     
        <label for="Option_2">
          <input id="Option_2" name="Option_2" type="checkbox" value="" />Sólo ejes
        </label>

        <label for="Option_3">
          <input id="Option_3" name="Option_3" type="checkbox" value="" />Sólo consultas
        </label>
      
    </div>

    <div className="form-group item-form">
    <legend>Fecha</legend>

        <label for="Option_1">
          <input id="Option_1" name="Option_1" type="checkbox" value="" />Cualquier fecha
        </label>

        <label for="Option_2">
          <input id="Option_2" name="Option_2" type="checkbox" value="" />Fecha de publicación
        </label>

        <label for="Option_3">
          <input id="Option_3" name="Option_3" type="checkbox" value="" />Fecha de cierre
        </label>

    </div>

    <div className="fecha-form">
      <div className="form-group item-form fecha">
        <label for="fecha">Fecha</label>
        <input type="date" className="form-control fecha" id="fecha" required="" aria-required="true" />
      </div>
    </div>

    <div className="form-group item-form">
    <legend>Autor</legend>

      <select id="dato_8_20" name="dato_8_20" className="form-control">
        <option value="" selected="">Todos los autores</option>
        <option value="opciones1">autor</option>
      </select>
    </div>

    <div className="form-group item-form">
    <legend>Etiqueta</legend>

      <select id="dato_8_20" name="dato_8_20" className="form-control">
        <option value="" selected="">Cualquier etiqueta</option>
        <option value="opciones1">Opción 1</option>
      </select>
    </div>

    <div className="button-link form">
      <a href="" className="btn btn-link">Cancelar</a>
      <a href="" className="btn btn-success">Aplicar</a>
    </div>
  </div>

</div>  
)