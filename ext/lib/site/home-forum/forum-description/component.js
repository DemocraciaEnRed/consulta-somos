import React, { Component } from 'react'

export default class extends Component {
  createClauses = (clauses) => {
    const cleanText =  clauses.replace(/<\/?[^>]+(>|$)/g, '').split(' ')
    return {
      __html: clauses
    }
  }

  render () {
    const { content } = this.props

    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className={`col-md-12 content`}
            ref='content'
            dangerouslySetInnerHTML={this.createClauses(content)} />
        </div>
      </div>
    )
  }
}