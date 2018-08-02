import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import userConnector from 'lib/site/connectors/user'
import Footer from 'ext/lib/site/footer/component'

import forumStore from '../../stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeFilter: 'byDate',
      forums: []
    }
  }

  componentDidMount () {
    forumStore
      .findAll()
      .then((forums) => {
        this.setState({ forums })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    forumStore
      .findBy(name)
      .then((forums) => {
        this.setState({
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    window.scrollTo(0, consultasNode.offsetTop)
  }

  render () {
    if (this.props.user.state.pending) return null

    const { activeFilter, forums } = this.state



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
              {this.props.user.state.rejected ? (
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
              ) : (
                <p>
                  <button
                    className='btn btn-primary'
                    onClick={this.handleButtonClick}>
                    Quiero participar
                  </button>
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

        <div className='lead-paragraph last col-md-4 offset-md-4 col-xs-12'>
          <p>Conocé las consultas disponibles</p>
          <i className="icon-arrow-down" />
        </div>

        <div className='container forums-list' ref='consultas'>
          <h2 className='forums-list-title'>Consultas</h2>
          <div className="filter-container content-center">
            <div className="btn-group btn-group-sm" role="group" aria-label="Filtros">
              <button
                type="button"
                className={`btn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                Nuevas
              </button>
              <button
                type="button"
                className={`btn ${activeFilter === 'byPopular' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byPopular')}
              >
                Populares
              </button>
              <button
                type="button"
                className={`btn ${activeFilter === 'byClosed' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byClosed')}
              >
                Finalizadas
              </button>
            </div>
          </div>
          {!forums.length && <h3 className="no-result">No hay resultados</h3>}
          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={key} />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)


