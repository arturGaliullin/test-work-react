import {GET_SERVICE_SUCCESS} from '../constants'

export default function upload(state = {upload_url: 'https://www.google.ru'}, action) {
    switch (action.type) {
        case GET_SERVICE_SUCCESS:
            return {...state, upload_url: action.payload}
        default:
            return state
    }
}

