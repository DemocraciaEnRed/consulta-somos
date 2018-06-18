import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import forumStore from 'lib/stores/forum-store/forum-store'
import topicStore from 'lib/stores/topic-store/topic-store'
import Footer from 'ext/lib/site/footer/component'
import TopicCard from './topic-card/component'

export default class HomeForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      forum: null,
      topics: []
    }
  }

  componentDidMount () {
    const name = this.props.params.forum

    forumStore.findOneByName(name)
      .then((forum) => {
        this.setState({ forum })

        return Promise.all([
          forum,
          topicStore.findAll({ forum: forum.id })
        ])
      })
      .then(([forum, [ topics, pagination ]]) => {
        this.setState({
          forum,
          topics
        })
      })
      .catch((err) => {
        if (err.status === 404) browserHistory.push('/404')
        if (err.status === 401) browserHistory.push('/401')
        throw err
      })
  }

  render () {
    if (!this.state.forum) return null

    const { forum } = this.state

    return (
      <div className='ext-forum-home'>
      
        <div className='topics-container'>
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    )
  }
}
