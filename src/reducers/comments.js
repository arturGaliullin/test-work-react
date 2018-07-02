import {GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAIL, GET_PHOTO_SUCCESS} from '../constants'

let initialState = {
    comments:[],
    fetching: false,
    error: ''
}

export default function comments(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS_REQUEST:
            return { ...state, fetching: true, error: '' }
        case GET_COMMENTS_SUCCESS:
            return { ...state, comments: action.payload, fetching: false, error: '' }
        case GET_COMMENTS_FAIL:
            return { ...state, error: action.payload.message, fetching: false }
        case GET_PHOTO_SUCCESS:
            return {...state, comments:[], fetching: false, error: ''}
        default:
            return state
    }
}