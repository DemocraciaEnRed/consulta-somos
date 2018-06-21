import React from 'react'
import { Link } from 'react-router'

export default ({ forum }) => (
  <div className='forum-card'>
    <div className='forum-card-img'>
      <img src={forum.coverUrl} />
    </div>
    <div className='forum-card-data'>
      <div className='forum-card-header'>
        <h3>{forum.title}</h3>
        <span>Autor:</span>
      </div>
      <div className='forum-card-body'>
        <p>{forum.summary}</p>
      </div>
      <div className='forum-card-footer'>
        <Link to='/'>
          <button className='btn btn-link' >
            Ver más información
          </button>
        </Link>
      </div>
    </div>
  </div>
)