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
            backgroundImage: `url('https://cldup.com/CAT-P2nS7m.jpg')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <h1>Bienvenido/a a #ConsultaPública</h1>
              <p className='lead'>
                Construimos un canal de <span>diálogo y debate</span> de distintas propuestas.
              </p>
              <p className='lead'>
                Ya sos parte de estas conversaciones, es tu turno de compartir tu opinión.
              </p>
              <p className='lead highlight'>
                Construyamos una Argentina más abierta, más transparente y colaborativa.
              </p>
              {this.props.user.state.rejected && (
                <p>
                  <Link
                    className='btn btn-primary'
                    to={{
                      pathname: '/signin',
                      query: { ref: '/' }
                    }}>
                    Quiero participar
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
        <div className='lead-paragraph'>
        <p>
        Seguí estos pasos para participar y debatir en una forma más efectiva y colaborativa
        </p>
        </div>
        <div className='section-icons col-md-8 offset-md-2'>
        <div className='row'>
        <div className='section-icon col-md-4 col-xs-12'><div className="fa-newspaper-o"></div><span>Informate</span> sobre las consultas</div>
        <div className='section-icon col-md-4 col-xs-12'  ><div className="fa-group"></div><span>Participá</span> en los ejes de las consultas</div>
        <div className='section-icon col-md-4 col-xs-12'><div className="fa-bullhorn"></div><span>Compartí</span> tu opinión</div>
        </div>        </div>

        <div className='lead-paragraph last'><p>Conocé las consultas publicadas</p></div>
        <div className='arrow'><div className="arrow-down"></div></div>
        

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
