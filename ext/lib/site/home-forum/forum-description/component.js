import React, { Component } from 'react'

export default class extends Component {
  state = {
    expanded: false,
    maxContent: false
  }

  componentDidMount () {
    const contentHeight = this.refs.content.offsetHeight
    if (contentHeight > 300) {
      this.setState({
        maxContent: true
      })
    }
  }

  createClauses = (clauses) => {
    const cleanText =  clauses.replace(/<\/?[^>]+(>|$)/g, '').split(' ')
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
            className={`col-md-12 content ${(this.state.maxContent && !this.state.expanded) ? 'cropped' : ''}`}
            ref='content'
            dangerouslySetInnerHTML={this.createClauses(content)} />
        </div>
        {this.state.maxContent &&
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