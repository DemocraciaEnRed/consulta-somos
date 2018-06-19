import React, { Component } from 'react'

const content = [
    {
        "markup" : "<div><span style=\"font-size: 24px;\">Objetivo principal</span></div>", 
        "position" : 0,
        "empty" : false
    }, 
    {
        "markup" : "<div>&nbsp;</div>", 
        "position" : 5,
        "empty" : true
    }, 
    {
        "markup" : "<div><span style=\"font-size: 24px;\">Hitos que permitan verificar el cumplimiento de la meta</span></div>", 
        "position" : 6,
        "empty" : false
    }, 
    {
        "markup" : "<div>1. Realización de una reunión de coordinación con sociedad civil y universidades para el establecimiento de temas prioritarios y estratégicos para el fortalecimiento del proceso electoral a ser tratados en un ciclo de debate.</div>", 
        "position" : 7,
        "empty" : false
    }, 
    {
        "markup" : "<div>Nueva | Agosto 2017 a Diciembre 2017</div>", 
        "position" : 8,
        "empty" : false
    }, 
    {
        "markup" : "<div>Se desarrollarán distintos encuentros con la ciudadanía para debatir sobre los temas centrales vinculados a la organización de un proceso electoral y co-organizar talleres de capacitación electoral con la sociedad civil con especial foco en los jóvenes.</div>", 
        "position" : 4,
        "empty" : false
    }, 
    {
        "markup" : "<div>2. Desarrollo de material de capacitación electoral para jóvenes.</div>", 
        "position" : 10,
        "empty" : false
    }, 
    {
        "markup" : "<div>Nueva | Agosto 2017 a Febrero 2018</div>", 
        "position" : 11,
        "empty" : false
    }, 
    {
        "markup" : "<div><br></div>", 
        "position" : 12,
        "empty" : true
    }, 
    {
        "markup" : "<div>3. Realización de al menos 6 encuentros para la discusión sobre procesos electorales en el marco de un ciclo de debates sobre la temática.</div>", 
        "position" : 13,
        "empty" : false
    }, 
    {
        "markup" : "<div>Nueva | Noviembre 2017 a Diciembre 2018</div>", 
        "position" : 14,
        "empty" : false
    }, 
    {
        "markup" : "<div><span style=\"font-size: 24px;\">Breve descripción de la meta</span></div>", 
        "position" : 3,
        "empty" : false
    }, 
    {
        "markup" : "<div><br></div>", 
        "position" : 15,
        "empty" : true
    }, 
    {
        "markup" : "<div><br></div>", 
        "position" : 2,
        "empty" : true
    }, 
    {
        "markup" : "<div>4. Realización de reuniones con la sociedad civil para la presentación y evaluación del material y acciones de capacitación electoral destinados a jóvenes durante 2017 (en clubes barriales, escuelas secundarias y universidades).</div>", 
        "position" : 16,
        "empty" : false
    }, 
    {
        "markup" : "<div>Promover la participación y la capacitación de la ciudadanía en el proceso electoral a través de la apertura de espacios de debate y mediante talleres dirigidos a electores jóvenes.</div>", 
        "position" : 1,
        "empty" : false
    }, 
    {
        "markup" : "<div>Nueva | Marzo 2018 a Junio 2019</div>", 
        "position" : 17,
        "empty" : false
    }, 
    {
        "markup" : "<div><br></div>", 
        "position" : 9,
        "empty" : true
    }
]


export default class extends Component {
  render () {
    function createClauses (clauses) {
      return {
        __html: clauses
          .sort(function (a, b) {
            return a.position > b.position ? 1 : -1
          })
          .map(function (clause) {
            return clause.markup
          })
          .join('')
          .replace(/<a/g, '<a rel="noopener noreferer" target="_blank"')
      }
    }

    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className='col-md-12 content'
            dangerouslySetInnerHTML={createClauses(content)} />
        </div>
      </div>
    )
  }
}