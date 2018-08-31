import React, { Component } from 'react'
import Flickity from 'flickity'
import topicStore from 'lib/stores/topic-store/topic-store'
import TopicCard from './topic-card/component'

export default class Carrusel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: null
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
        if (topics.length > 0) {
          this.setState({
            topics: topics.sort(() => 0.5 - Math.random())
          })
        }
      })
      .catch((err) => console.error(err))
  }

  componentDidUpdate () {
    if (this.flkty) this.flkty.destroy()
    const options = {
      cellAlign: 'left',
      draggable: false,
      // friction: 0.2,
      contain: true,
      pageDots: false,
      groupCells: window.matchMedia('(min-width: 1024px)').matches ? 3 : 1
    }
    this.flkty = new Flickity(this.refs.carrusel, options)
  }

  componentWillUnmount () {
    if (this.flkty) this.flkty.destroy()
  }

  render () {
    if (!this.props.forum || !this.state.topics) return null
    return (
      <div className="fondo-titulo">
        {this.props.topic &&
          <h2 className='title'>Podés seguir participando</h2>
        }
        <div className='topics-container' ref='carrusel'>
          {this.state.topics && this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic}/>
          ))}
        </div>
      </div>
    )
  }
}