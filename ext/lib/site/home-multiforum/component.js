import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/site/connectors/user'
import Footer from 'ext/lib/site/footer/component'
import forumStore from '../../stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import Search from './search/component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: []
    }
  }

  componentDidMount () {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 10
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  render () {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
          style={{
            backgroundColor: '#4eafe6'
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src="ext/lib/site/home-multiforum/somos-logo.png"
                alt="Logo"
              />
              <p className='lead highlight'>
                A Somos lo construimos entre todes
              </p>
              
              <button
                className='btn btn-primary participar'
                onClick={this.handleButtonClick}
              >
                Quiero participar
              </button>
            </div>
          </div>
        </section>

        <div className='lead-paragraph last col-md-4 offset-md-4 col-xs-12'>
          <i className='icon-arrow-down' onClick={this.handleButtonClick} />
        </div>
        <div className='lead-paragraph'>
                <p>
                  <span className="skyblue">Somos parte</span> nuevo espacio de acción y participación política en donde todos y
                  <br />
                  todas podamos sentirnos parte de un proyecto colectivo popular, feminista,
                </p>
                <br />
                <p className="bold">
                  Seguí estos pasos para participar y participa del movimiento
                </p>
              </div>

              <div className='section-icons col-md-10 offset-md-1'>
                <div className='section-icon'>
                  <img
                    className='icon'
                    src='https://consultapublica.blob.core.windows.net/assets/icono_consulta-publica-1.svg'
                    alt='Informate'
                  />
                  <div className='text'>
                    <h5>Informate</h5>
                  </div>
                </div>
                <div className='section-icon'>
                  <img
                    className='icon'
                    src='https://consultapublica.blob.core.windows.net/assets/icono_consulta-publica-2.svg'
                    alt='Participá'
                  />
                  <div className='text'>
                    <h5>Participá</h5>
                  </div>
                </div>
                <div className='section-icon'>
                  <img
                    className='icon'
                    src='https://consultapublica.blob.core.windows.net/assets/icono_consulta-publica-3.svg'
                    alt='Compartí'
                  />
                  <div className='text'>
                    <h5>Compartí</h5>
                  </div>
                </div>
              </div>
        <div className='container forums-list' id='consultas'>
          <h2 className='forums-list-title'>Conocé las consultas</h2>
          <div className="filter-container content-center">
            <div className="btn-group btn-group-sm dropdown-element" role="group" aria-label="Filtros">
            <button
                className={`btn dropbtn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
              {(() => {
                switch(this.state.activeFilter) {
                  case 'byDate':
                    return  'Nuevas'
                  case 'byPopular':
                    return 'Relevantes'
                  case 'byClosed':
                    return 'Finalizadas'
                  }
              })()}
              </button>
            <ul className='dropdown-content'>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                Nuevas
              </li>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byPopular' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byPopular')}
              >
                Relevantes
              </li>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byClosed' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byClosed')}
              >
                Finalizadas
              </li></ul>
            </div>
          </div>
          {!forums.length && <h3 className="no-result">No hay resultados</h3>}

          <Search />

          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className="btn btn-active show-more" onClick={this.handleMoreClick}>
                Cargar mas consultas
              </button>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)