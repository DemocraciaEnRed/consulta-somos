import React, { Component } from 'react'

export default class extends Component {
  state = {
    expanded: false
  }

  createClauses = (clauses) => {
    clauses
      .sort((a, b) => {
        return a.position > b.position ? 1 : -1
      })
    if (!this.state.expanded && clauses.length > 8) clauses = [... clauses].slice(0, 8)
    return {
      __html: clauses
        .map(function (clause) {
          return clause.markup
        })
        .join('')
        .replace(/<a/g, '<a rel="noopener noreferer" target="_blank"')
    }
  }

  expandText = () => {
    this.setState((prevState) => (
      { expanded: !prevState.expanded }
    ), () => console.log(this.state.expanded))
  }

  render () {
    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className='col-md-12 content'
            dangerouslySetInnerHTML={this.createClauses(this.props.content)} />
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