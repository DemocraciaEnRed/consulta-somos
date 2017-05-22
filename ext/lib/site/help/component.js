import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import Sidebar from 'ext/lib/site/help/sidebar/component'
import MarkdownGuide from 'lib/site/help/md-guide/component'

export default class HelpLayout extends Component {
  articles = [
    {
      title: '¿Cómo funciona?',
      Content: () => <Content content={require('./como.md')} />,
      slug: 'como-funciona',
      path: '/ayuda/como-funciona'
    },
    {
      title: 'Acerca de este sitio',
      Content: () => <Content content={require('./acerca.md')} />,
      slug: 'acerca',
      path: '/ayuda/acerca'
    },
    {
      title: t('help.tos.title'),
      Content: () => <Content content={require('./tos.md')} />,
      slug: 'terminos-y-condiciones',
      path: '/ayuda/terminos-y-condiciones'
    },
    {
      title: t('help.pp.title'),
      Content: () => <Content content={require('./pp.md')} />,
      slug: 'privacidad',
      path: '/ayuda/privacidad'
    },
    {
      title: t('help.markdown.title'),
      Content: MarkdownGuide,
      slug: 'markdown',
      path: '/ayuda/markdown'
    }
  ]

  render () {
    const article = this.props.params.article || this.articles[0].slug
    const active = this.articles.find((art) => art.slug === article)

    return (
      <div className='help-container container'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Consultas</Link>
          </li>
          <li className='breadcrumb-item active'>
            <Link to='/ayuda'>Ayuda</Link>
          </li>
          <li className='breadcrumb-item active'>
            <span>{active.title}</span>
          </li>
        </ol>
        <section>
          <div className='row'>
            <aside className='col-md-4'>
              <Sidebar
                activeSlug={active.slug}
                articles={this.articles} />
            </aside>
            <aricle className='help-content col-md-8'>
              <active.Content />
            </aricle>
          </div>
        </section>
      </div>
    )
  }
}

const Content = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)
