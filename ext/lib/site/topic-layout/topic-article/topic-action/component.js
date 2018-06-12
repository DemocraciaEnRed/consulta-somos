import React, { Component } from 'react'
import Vote from 'lib/site/topic-layout/topic-article/vote/component'
import Poll from 'lib/site/topic-layout/topic-article/poll/component'
import Cause from 'lib/site/topic-layout/topic-article/cause/component'
import Slider from 'lib/site/topic-layout/topic-article/slider/component'
import Hierarchy from 'lib/site/topic-layout/topic-article/hierarchy/component'

export default class extends Component {
  render () {
    const { topic } = this.props
    return (
      <div className='topic-article-content'>
      {
        topic.action.method && topic.action.method === 'vote' && (
          <Vote topic={topic} />
        )
      }
      {
        topic.action.method && topic.action.method === 'poll' && (
          <Poll topic={topic} />
        )
      }
      {
        topic.action.method && topic.action.method === 'cause' && (
          <Cause topic={topic} />
        )
      }
      {
        topic.action.method && topic.action.method === 'slider' && (
          <Slider topic={topic} />
        )
      }
      {
        topic.action.method && topic.action.method === 'hierarchy' && (
          <Hierarchy topic={topic} />
        )
      }
      </div>
    )
  }
}