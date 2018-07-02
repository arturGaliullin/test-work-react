import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

export default class Album extends Component {

    handleLoad = (id, title, count) => {
        this.props.getPhotos(id, title, count)
    }

    toLocalTime = (time) => {
        let date = new Date(time*1000)
        return date.toLocaleDateString()
    }

    render() {
        const album = this.props.album
        return(
            <Link className='link' onClick={() => this.handleLoad(album.id, album.title, 0)} to="/photos">
                <div className='album__item'>
                    <div className='album__img'>
                        <img src={album.thumb_src} alt=""/>
                    </div>
                    <div className='album__content'>
                        <p className='album__name'>{album.title}</p>
                        <p className='album__property'>{album.size} files</p>
                        <p className='album__property'>{this.toLocalTime(album.updated)} last</p>
                    </div>
                </div>
            </Link>
        )
    }

}

Album.propTypes = {
    album: PropTypes.object.isRequired
}
