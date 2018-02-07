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
        <section
          className='cover jumbotron'
          style={(forum.coverUrl && {
            backgroundImage: 'linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url("' + forum.coverUrl + '")'
          }) || null}>
          <div className='jumbotron_bar'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>Consultas</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                      <span>{forum.title}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='jumbotron_body'>
            <div className='container'>
              <h1>{forum.title}</h1>
              <p className='lead'>{forum.summary}</p>
            </div>
          </div>
        </section>
        <div className='topics-container'>
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
