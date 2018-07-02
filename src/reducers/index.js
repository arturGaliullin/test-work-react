import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import albums from './albums'
import photos from './photos'
import photo from './photo'
import comments from './comments'
import upload from './upload'

export default combineReducers({
    routing: routerReducer,
    user,
    albums,
    photos,
    photo,
    comments,
    upload

})