import React, { Component } from 'react'
import Flickity from 'flickity'
import topicStore from 'lib/stores/topic-store/topic-store'
import TopicCard from './topic-card/component'

export default class Carrusel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: []
    }
    this.flkty = null
  }

  componentDidMount () {
    topicStore.findAll({ forum: this.props.forum.id })
      .then((res) => {
        let topics = res[0]
        if (this.props.topic !== undefined) {
          topics = [...topics].filter((topic) => topic.id !== this.props.topic.id)
        }
        this.setState({
          topics: topics.sort(() => 0.5 - Math.random())
        })
      })
      .catch((err) => console.error(err))
  }

  componentDidUpdate () {
    if (this.flkty) this.flkty.destroy()
    const options = {
      cellAlign: 'center',
      draggable: false,
      // friction: 0.2,
      contain: true,
      pageDots: false,
      wrapAround: true
    }
    this.flkty = new Flickity(this.refs.carrusel, options)
  }

  componentWillUnmount () {
    this.flkty.destroy()
  }

  render () {
    if (!this.props.forum) return null
    return (
        <div className='topics-container' ref='carrusel'>
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic}/>
          ))}
        </div>
    )
  }
}