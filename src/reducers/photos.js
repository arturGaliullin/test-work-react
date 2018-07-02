import {GET_PHOTO_SUCCESS, GET_PHOTOS_SUCCESS, PREV_STATE} from '../constants'

let initialState = {
    photos: [],
    title: '',
    album_id: ''
}

export default function photos(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_SUCCESS:
            return {...state, photos: action.payload.photos, album_id: action.payload.album_id, title: action.payload.title}
        default:
            return state
    }
}

