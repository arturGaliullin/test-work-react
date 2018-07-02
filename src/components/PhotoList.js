import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Photo from './Photo'

export default class PhotoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 20
        }
    }

    loadMore = (id, title) => {
        const getPhotos = this.props.getPhotos
        this.setState((prevState, props) => ({
            count: prevState.count + 20
        }), () => getPhotos(id, title, this.state.count))

    }

    render() {
        const photos = this.props.photos
        const {album_id, title} = this.props
        const photosContent = photos.map(photo =>
            <Photo getPhoto={this.props.getPhoto} key={photo.id} photo={photo} />
        )
        return(
            <div>
                <div className = 'photo'>
                    {photosContent}
                </div>
                <button className='btn' onClick={() => this.loadMore(album_id, title)}>Show more</button>
            </div>

        )
    }

}

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired
}

