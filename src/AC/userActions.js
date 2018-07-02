import {LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL, GET_ALBUMS_REQUEST, PREV_STATE} from '../constants'

export function handleLogin() {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })

        VK.Auth.login(r => {
            if(r.session) {
                let username = r.session.user.first_name

                dispatch({
                    type: LOGIN_SUCCES,
                    payload: username
                })

                VK.Api.call('photos.getAlbums', { need_covers: 1, v: 5.80},(r) => {
                    let albums = r.response.items
                    console.log(albums)
                    dispatch({
                        type: GET_ALBUMS_REQUEST,
                        payload: albums
                    })
                })
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: new Error('Ошибка в авторизации')
                })
            }
        }, 4)
    }
}