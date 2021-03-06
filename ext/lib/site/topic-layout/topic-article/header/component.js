import React, { Component } from 'react'
import t from 't-component'
import config from 'lib/config'
import Timeago from 'lib/site/timeago'
import urlBuilder from 'lib/url-builder'
import { Link } from 'react-router'

export default class Header extends Component {
  render () {
    var learnMore = null
    if (config.learnMoreUrl) {
      learnMore = (
        <div className='alert alert-warning alert-dismissable system-alert'>
          <button className='close' data-dismiss='alert' aria-hidden='true' />
          <span>{t('proposal-article.article.alert.text')}&nbsp;&nbsp;</span>
          <a
            href={config.learnMoreUrl}
            className='alert-link'
            target='_blank'
            rel='noopener noreferrer'>
            {t('proposal-article.article.alert.learn-more')}
          </a>
        </div>
      )
    }

    var closingAt
    if (!this.props.closed && this.props.closingAt) {
      closingAt = (
        <div className="alert alert-success" role="alert">
        <span className={ this.props.closed ? 'icon-lock' : 'icon-lock-open'} style={{marginRight: '5px'}}></span>
        <span>La consulta cierra </span>
          <Timeago className='' date={this.props.closingAt} />
          </div>

      )
    }

    var isClosed
    if (this.props.closed){
      isClosed = (
        (
          <div className="alert alert-danger" role="alert">
            <span className="icon-lock" style={{marginRight: '5px'}}></span>
            <span>La consulta se encuentra cerrada</span>
          </div>
        )
      )
    }

    let author = null
    if (this.props.author) {
      let authorName
      if (this.props.authorUrl) {
        authorName = (
          <a
            href={this.props.authorUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {this.props.author}
          </a>
        )
      } else {
        authorName = this.props.author
      }
      author = (
        <h2 className='author'>{t('admin-topics-form.label.author')}:
          &nbsp;{authorName}
        </h2>
      )
    }

    return (
      <header className={`topic-article-header topic-article-content ${this.props.closed ? 'isclosed' : ''}`}>
        {isClosed}
        { this.props.children }
        {learnMore}
        {closingAt}
        <h1>{this.props.mediaTitle}</h1>
        {author}

        {
          this.props.tags &&
          this.props.tags.length > 0 &&
          (
            <div className='topic-tags'>
              { this.props.tags.map((tag, i) => <span key={i}>{tag}</span>) }
            </div>
          )
        }

      </header>
    )
  }
}
