import React, { Component } from 'react'
import topicStore from 'lib/stores/topic-store/topic-store'
import ForumCard from '../forum-card/component'

export default class extends Component {
  state = {
    topics: null
  }

  componentDidMount () {
    topicStore.findAll({forum: this.props.forum.id})
    .then(([topics, pagination]) => {
      this.setState({
        topics: topics
      })
    })
  }

  render () {
    return (
      <div className='container forums-list'>
        <ForumCard forum={this.props.forum} />
      </div>
    )
  }
}