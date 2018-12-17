import React, { Component } from 'react'
import t from 't-component'

export default class BtnMiArgentina extends Component {
  static defaultProps = {
    action: 'ext/auth/miargentina/login'
  }

  render () {
    const { action } = this.props

    return (
      <form
        className='btn-miargentina-form'
        action={action}
        method='get'
        role='form'>
        <button
          className='btn btn-block btn-miargentina'
          type='submit'>
         <div className='user-icon'></div>
          {'Mi Argentina'}
        </button>
      </form>
    )
  }
}
