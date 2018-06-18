import React, { Component } from 'react'
import topicStore from 'lib/stores/topic-store/topic-store'
import forumStore from 'lib/stores/forum-store/forum-store'
import TopicCard from './topic-card/component'
import { Link, browserHistory } from 'react-router'

export default class Carrusel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forum: null,
      topics: []
    }
  }
  componentDidMount () {
    const name = 'innovacion'

    forumStore.findOneByName(name)
      .then((forum) => {
        this.setState({ forum }), () => console.log(forum)

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
       //c if (err.status === 401) browserHistory.push('/401')
        throw err
      })
  }

  render () {
    if (!this.state.forum) return null

    const { forum } = this.state
    return (
      <div className='seccion-proyectos container-fluid'>
        <div className="fondo-titulo">
          <h2 className='title'>Otros ejes de esta consulta</h2>
        </div>
        <div ref='carrusel'>
        <div className='topics-container'>
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        </div>
     
      </div>
    )
  }
}
