import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import debug from 'debug'
import userConnector from 'lib/site/connectors/user'
import forumStore from 'lib/stores/forum-store/forum-store'

const log = debug('democracyos:home-multiforum')

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      forums: [],
      userHasForums: false,
      loading: false,
      loadingUserForms: false
    }
  }

  componentWillMount () {
    this.setState({ loading: true })

    forumStore.findAll()
      .then((forums) => {
        this.setState({
          loading: false,
          noMore: forums.length === 0,
          forums: this.state.forums.concat(forums),
          page: this.state.page + 1
        })
      }).catch((err) => {
        log('Forum home fetch error: ', err)
        this.setState({ loading: false })
      })

    this.getUserForums()
  }

  getUserForums = () => {
    this.setState({ loadingUserForms: true })

    forumStore.findAll({
      'privileges.canChangeTopics': true
    }).then((forums) => {
      this.setState({
        userHasForums: forums && forums.length > 0,
        loadingUserForms: false
      })
    }).catch((err) => {
      if (err.status !== 400) throw err

      this.setState({
        userHasForums: false,
        loadingUserForms: false
      })
    })
  }

  render () {
    if (this.state.loadingUserForms) return null
    if (this.props.user.state.pending) return null

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='jumbotron ext-site-home-multiforum-cover'
          style={{
            backgroundImage: `url('https://cldup.com/8D9kbn12Nn.jpg')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <h1>¡El país lo hacés vos, es tu turno de hablar!</h1>
              <p className='lead'>
                Entrá, comentá y debatí.
              </p>
              {this.props.user.state.rejected && (
                <p>
                  <Link
                    className='btn btn-primary'
                    to={{
                      pathname: '/signin',
                      query: { ref: '/' }
                    }}>
                    Participar
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
        <div className='container forums-list'>
          {this.state.forums.map((forum, key) => (
            <Link
              key={forum.id}
              className='forums-list-item panel panel-default'
              to={forum.url}>
              {forum.coverUrl && (
                <div className='panel-heading' style={{
                  backgroundImage: `url('${forum.coverUrl}')`
                }} />
              )}
              <div className='panel-body'>
                <h3>{forum.title}</h3>
                <p>{forum.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
