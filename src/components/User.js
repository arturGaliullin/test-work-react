import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class User extends Component {
    toPrevState = () => {
        history.back()
    }

    render() {
        const {user, message, error} = this.props.user
        const buttonPrev = <img className="prev-icon" onClick={this.toPrevState} src="../image/back.svg" alt=""/>
        const folderIcon = <img className="folder-icon" src="../image/folder.svg" alt=""/>
        const messageText = <span className='user__text'>{message}</span>
        let template
        if(user) {
            template = <p className='user__title'>{message !== null ? messageText : buttonPrev}{message !== null ? '' : folderIcon}<span className='user__text'>{user}</span></p>
        } else {
            template = <button className='btn' onClick={this.props.handleLogin}>Войти</button>
        }
        return (
            <div className='user'>
                {template}
                {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
            </div>
        )

    }
}

User.propTypes = {
    user: PropTypes.object.isRequired
}