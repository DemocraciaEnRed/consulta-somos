import React, { Component } from 'react'
import Jump from 'jump.js'

export default ({ nodes }) => (
  <div className={`lateral-bar-container ${nodes.length > 0 ? 'large' : 'small'}`}>

  {console.log(nodes.length)}
    <ul className='lateral-bar-list'>
      {nodes.map((node,i) => (
        <li className='lateral-bar-item' key={i}>
          <a onClick={() => Jump(node)}>{node.innerText}</a>
        </li>
      ))
      }
    </ul>
  </div>
)
