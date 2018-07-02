import {GET_PHOTO_SUCCESS} from '../constants'

let initialState = {
    photo: {
        photo_604: '',
        text: '',
        date: '',
        likes: '',
        comments: ''
    }
}

export default function photo(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTO_SUCCESS:
            return {...state, photo: action.payload}
        default:
            return state
    }
}

