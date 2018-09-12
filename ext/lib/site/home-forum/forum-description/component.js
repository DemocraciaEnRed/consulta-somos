import React, { Component } from 'react'

export default class extends Component {
  render () {
    const { content } = this.props

    return (
      <div className='container forum-description'>
        <div className='row'>
          <div
            className={`col-md-12 content`}
            ref='content'
            dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    )
  }
}