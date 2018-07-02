import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import User from '../components/User'
import AlbumList from '../components/AlbumList'
import PhotoList from '../components/PhotoList'
import PhotoItem from '../components/PhotoItem'
import Upload from '../components/Upload'
import {getPhotos, getPhoto, getComments, uploadPhoto} from '../AC/pageActions'
import {handleLogin} from '../AC/userActions'
import { BrowserRouter as Router, Route, NavLink as Link } from 'react-router-dom'


class App extends Component {

    render() {

        const albumsElement = <AlbumList albums = {this.props.albums} getPhotos={this.props.getPhotos}/>
        const photosElement = <PhotoList
            getPhotos={this.props.getPhotos}
            getPhoto={this.props.getPhoto}
            getComments={this.props.getComments}
            photos = {this.props.photos.photos}
            title={this.props.photos.title}
            album_id={this.props.photos.album_id}
        />
        const uploadElement = <Upload upload_url={this.props.upload} uploadPhoto={this.props.uploadPhoto} albums = {this.props.albums} />
        return (
            <div>
                <Router>
                    <main>
                        <ul className='menu'>
                            <Link exact activeClassName="active" className='menu__link' to="/albums">
                                <li className='menu__item'>
                                    <img className="menu-icon" src="../image/image.svg" alt=""/>
                                </li>
                            </Link>
                            <Link activeClassName="active" className='menu__link' to="/upload">
                                <li className='menu__item'>
                                    <img className="menu-icon" src="../image/upload.svg" alt=""/>
                                </li>
                            </Link>
                        </ul>
                        <User user = {this.props.user} handleLogin={this.props.handleLogin}/>
                        <Route exact path='/albums' component={() => albumsElement}/>
                        <Route exact path='/photos' component={() => photosElement}/>
                        <Route exact path='/photo' render={() => <PhotoItem
                            comments={this.props.comments.comments}
                            fetching={this.props.comments.fetching}
                            error={this.props.comments.error}
                            getComments={this.props.getComments}
                            photo = {this.props.photo}/>}
                        />
                        <Route exact path='/upload' component={() => uploadElement}/>
                    </main>
                </Router>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogin: bindActionCreators(handleLogin, dispatch),
        getPhotos: bindActionCreators(getPhotos, dispatch),
        getPhoto: bindActionCreators(getPhoto, dispatch),
        getComments: bindActionCreators(getComments, dispatch),
        uploadPhoto: bindActionCreators(uploadPhoto, dispatch)
    }
}

export default connect(state => {
     return {
         user: state.user,
         albums: state.albums,
         photos: {
             photos: state.photos.photos,
             title: state.photos.title,
             album_id: state.photos.album_id
         },
         photo: state.photo,
         comments: {
             fetching: state.comments.fetching,
             error: state.comments.error,
             comments: state.comments.comments
         },
         upload: state.upload.upload_url
     }
 }, mapDispatchToProps)(App)


