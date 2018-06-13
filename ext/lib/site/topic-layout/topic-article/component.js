import React, { Component } from 'react'
import bus from 'bus'
import t from 't-component'
import urlBuilder from 'lib/url-builder'
import userConnector from 'lib/site/connectors/user'
import Header from 'ext/lib/site/topic-layout/topic-article/header/component'
import Content from 'lib/site/topic-layout/topic-article/content/component'
import Footer from 'lib/site/topic-layout/topic-article/footer/component'
import Social from './social/component'
import Vote from 'lib/site/topic-layout/topic-article/vote/component'
import Poll from 'lib/site/topic-layout/topic-article/poll/component'
import Cause from 'lib/site/topic-layout/topic-article/cause/component'
import Slider from 'lib/site/topic-layout/topic-article/slider/component'
import AdminActions from 'lib/site/topic-layout/topic-article/admin-actions/component'
import Hierarchy from 'lib/site/topic-layout/topic-article/hierarchy/component'
import Comments from './comments/component'


class TopicArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSidebar: false
    }
  }

  componentWillMount () {
    bus.on('sidebar:show', this.toggleSidebar)
  }

  componentWillUnmount () {
    bus.off('sidebar:show', this.toggleSidebar)
  }

  toggleSidebar = (bool) => {
    this.setState({
      showSidebar: bool
    })
  }

  handleCreateTopic = () => {
    window.location = urlBuilder.for('admin.topics.create', {
      forum: this.props.forum.name
    })
  }

  render () {
    const {
      topic,
      forum,
      user
    } = this.props

    const userAttrs = user.state.fulfilled && (user.state.value || {})
    const canCreateTopics = userAttrs.privileges &&
      userAttrs.privileges.canManage &&
      forum &&
      forum.privileges &&
      forum.privileges.canChangeTopics

    if (!topic) {
      return (
        <div className='no-topics'>
          <p>{t('homepage.no-topics')}</p>
          {
            canCreateTopics && (
              <button
                className='btn btn-primary'
                onClick={this.handleCreateTopic} >
                {t('homepage.create-debate')}
              </button>
            )
          }
        </div>
      )
    }

    return (
      <div className='topic-article-wrapper'>
        <Social topic={topic} />
        
        <div className='secondary-wrapper'>

        {
          this.state.showSidebar &&
            <div onClick={hideSidebar} className='topic-overlay' />
        }
        <AdminActions forum={forum} topic={topic} />

        <Header
          closingAt={topic.closingAt}
          closed={topic.closed}
          author={topic.author}
          authorUrl={topic.authorUrl}
          tags={topic.tags}
          forumName={forum.name}
          mediaTitle={topic.mediaTitle} />
        {topic.clauses && <Content clauses={topic.clauses} />}
        {
          topic.links && (
            <Footer
              source={topic.source}
              links={topic.links}
              socialUrl={topic.url}
              title={topic.mediaTitle} />
          )
        }
    {   /*  {
          topic.action.method && topic.action.method === 'vote' && (
            <Vote topic={topic} />
          )
        }
        {
          topic.action.method && topic.action.method === 'poll' && (
            <div className='topic-article-content'>
              <Poll topic={topic} />
            </div>
          )
        }
        {
          topic.action.method && topic.action.method === 'cause' && (
            <div className='topic-article-content'>
              <Cause topic={topic} />
            </div>
          )
        }
        {
          topic.action.method && topic.action.method === 'slider' && (
            <div className='topic-article-content'>
              <Slider topic={topic} />
            </div>
          )
        }
        {
          topic.action.method && topic.action.method === 'hierarchy' && (
            <div className='topic-article-content'>
              <Hierarchy topic={topic} />
            </div>
          )
        } */ }
        {
          !user.state.pending && <Comments forum={forum} topic={topic} />
        }
      </div>
  </div>

    )
  }
}

export default userConnector(TopicArticle)

function hideSidebar () {
  bus.emit('sidebar:show', false)
}
