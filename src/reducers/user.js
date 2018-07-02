import {LOGIN_SUCCES, LOGIN_FAIL, GET_PHOTOS_REQUEST} from '../constants'

const initialState = {
    user: '',
    message: 'Welcome, ',
    error: ''
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return {...state, user: action.payload, message: null}
        case LOGIN_SUCCES:
            return {...state, user: action.payload}
        case LOGIN_FAIL:
            return {...state, error: action.payload.message}
        default:
            return state
    }
}