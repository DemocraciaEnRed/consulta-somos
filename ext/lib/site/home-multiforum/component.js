import React, { Component } from 'react'
import { Link } from 'react-router'
import userConnector from 'lib/site/connectors/user'
import forumStore from 'lib/stores/forum-store/forum-store'
import Footer from 'ext/lib/site/footer/component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      forums: []
    }
  }

  componentDidMount () {
    forumStore.findAll().then((forums) => {
      this.setState({ forums })
    }).catch((err) => { throw err })
  }

  render () {
    if (this.props.user.state.pending) return null

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
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
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
