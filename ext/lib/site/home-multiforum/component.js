import React, { Component } from 'react'
import { Link } from 'react-router'
import userConnector from 'lib/site/connectors/user'
import forumStore from 'lib/stores/forum-store/forum-store'
import Footer from 'ext/lib/site/footer/component'
import ForumCard from './forum-card/component'

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
            backgroundImage: `url('https://cldup.com/CAT-P2nS7m.jpg')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <h1>Bienvenido/a a #ConsultaPública</h1>
              <p className='lead'>
                Construyamos una Argentina más abierta, transparente y colaborativa. Entrá, participá y debatí.   
              </p>
              {this.props.user.state.rejected && (
                <p>
                  <Link
                    className='btn btn-primary'
                    to={{
                      pathname: '/signin',
                      query: { ref: '/' }
                    }}>
                    Participá
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
        <div className='container forums-list'>
          {this.state.forums.map((forum, key) => (
            <ForumCard forum={forum} key={key} />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
