import React, { Component } from 'react'

export default class extends Component {
  render () {
    const { content } = this.props

    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className={`col-md-8 offset-md-2 content`}
            ref='content'
            dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    )
  }
}