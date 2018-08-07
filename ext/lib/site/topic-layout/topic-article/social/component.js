import React, { PureComponent } from 'react'
import t from 't-component'
import config from 'lib/config'
const moment = require('moment')

export default ({ topic }) => {
  const { url, mediaTitle, action } = topic

  const socialLinksUrl = window.location.origin + url
  const twitterText = encodeURIComponent(
    config.tweetText ? t(config.tweetText, { topic }) : mediaTitle
  )

  return (
    <div className='topic-article-content topic-social'>
      <div className='participants-box'>
        <span>Publicado</span>
        <span>{
          moment(topic.publishedAt).format("MMM Do YY")
        }</span>
        <span>Compartir en redes sociales</span>
      </div>
      <div className='share-links'>
        <a
          href={`http://www.facebook.com/sharer.php?u=${socialLinksUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          className='icon-social-facebook' />
        <a
          href={`http://twitter.com/share?text=${twitterText}&url=${socialLinksUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          className='icon-social-twitter' />
      </div>
    </div>
  )
}
