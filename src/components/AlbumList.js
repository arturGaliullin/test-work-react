import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Album from './Album'

export default class AlbumList extends Component {
    render() {
        const albums = this.props.albums
        const albumElement = albums.map(album =>
            <Album key={album.id} getPhotos={this.props.getPhotos} album={album} />
        )
        return(
            <div className = 'album'>
                {albumElement}
            </div>
        )
    }

}

AlbumList.propTypes = {
    albums: PropTypes.array.isRequired
}

