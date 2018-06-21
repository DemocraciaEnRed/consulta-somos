import React, { Component } from 'react'
import CardsSlider from 'ext/lib/site/cards-slider/component'
import ForumCard from '../forum-card/component'

export default ({ forum }) => (
  <div className='container forums-list'>
    <ForumCard forum={forum} />
    <CardsSlider forum={forum} />
  </div>
)
