import React, { Component } from 'react'

export default class extends Component {
  state = {
    expanded: false
  }

  createClauses = (clauses) => {
    const cleanText =  clauses.replace(/<\/?[^>]+(>|$)/g, '').split(' ')
    if (!this.state.expanded && clauses.length > 8) clauses = cleanText.slice(0, 8).join(' ')
    return {
      __html: clauses
    }
  }

  expandText = () => {
    this.setState((prevState) => (
      { expanded: !prevState.expanded }
    ))
  }

  render () {
    const { content } = this.props

    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className='col-md-12 content'
            dangerouslySetInnerHTML={this.createClauses(content)} />
        </div>
        {content.length > 8 &&
          <div className='row'>
            <div className={`col-md-12 text-center button-container ${!this.state.expanded ? 'see-more' : ''}`}>
              <a
                onClick={this.expandText}
                className='bg-white text-secondary' >
                {!this.state.expanded ? 'Leer más información sobre la consulta' : 'Leer menos'}
              </a>
            </div>
          </div>
        }
      </div>
    )
  }
}