import {GET_ALBUMS_REQUEST} from '../constants'

export default function albums(state = [], action) {
    switch (action.type) {
        case GET_ALBUMS_REQUEST:
            return action.payload
        default:
            return state
    }
}