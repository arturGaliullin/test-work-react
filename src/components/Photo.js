import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

export default class Photo extends Component {

    toLocalTime = (time) => {
        let date = new Date(time*1000)
        return date.toLocaleDateString()
    }

    showPhoto = (id, user_id) => {
        this.props.getPhoto(id, user_id)
    }

    render() {
        const photo = this.props.photo
        return(
                <div className='photo_item'>
                    <div className='photo__img'>
                        <img src={photo.photo_130} alt=""/>
                    </div>
                    <div className='photo__content'>
                        <p className='photo__info'><b>Text: </b>{photo.text}</p>
                        <p className='photo__info'><b>Date: </b>{this.toLocalTime(photo.date)}</p>
                        <p className='photo__info'><b>Likes: </b>❤ {photo.likes.count}</p>
                        <p className='photo__info'><b>Comments: </b>{photo.comments.count}</p>
                    </div>
                    <Link className='photo__link' onClick={() => this.showPhoto(photo.id, photo.owner_id)} to='/photo' >
                        Select
                    </Link>
                </div>
        )
    }

}

Photo.propTypes = {
    photo: PropTypes.object.isRequired
}
