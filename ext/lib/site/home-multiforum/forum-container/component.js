import React, { Component } from 'react'
import CardsSlider from 'ext/lib/site/cards-slider/component'
import ForumCard from '../forum-card/component'

export default ({ forum }) => (
  <div className='container forum-card-container'>
    <ForumCard forum={forum} />
    <div className='forum-slider-wrapper'>
      <h4 className='forum-slider-title'>{
        forum.extra.contentType === 'ejes' && 'Los ejes '
      }
      {
        forum.extra.contentType === undefined && 'Los ejes '
      }
      {
        forum.extra.contentType === 'propuestas' && 'Las propuestas '        
      }que comprenden esta consulta son:</h4>
      <CardsSlider forum={forum} />
    </div>
  </div>
)
