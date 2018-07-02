import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTO_SUCCESS, GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAIL, GET_SERVICE_SUCCESS} from '../constants'


export function getPhotos(id, title, count) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: title
        })
        console.log(count)
        VK.Api.call('photos.get', { album_id: id, v: 5.80, extended: 1, count: 20+count},(r) => {
            let photos = r.response.items

            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: {
                    photos: photos,
                    album_id: id,
                    title: title
                }
            })
        })
    }
}

export function getPhoto(id, user_id) {
    return (dispatch) => {

        VK.Api.call('photos.getById', { photos: `${user_id}_${id}`, v: 5.80, extended: 1},(r) => {
            let photo = r.response[0]
            dispatch({
                type: GET_PHOTO_SUCCESS,
                payload: photo
            })
        })
    }
}


export function getComments(id, user_id) {

    return (dispatch) => {
        dispatch({
            type: GET_COMMENTS_REQUEST
        })

        getMoreComments(id, user_id, dispatch)

    }
}

function getMoreComments(id, user_id, dispatch) {
    VK.Api.call('photos.getComments', { owner_id: user_id, photo_id: id, need_likes: 1, v: 5.80, extended: 1, fields: 'first_name, last_name, photo_50, domain'},(r) => {
        try {
            let comments = r.response.items
            let users = r.response.profiles
            let newComments = []
            comments.forEach(item => {
                users.forEach(user => {
                    if(item.from_id === user.id) {
                        item.user_name = `${user.first_name} ${user.last_name}`
                        item.photo_50 = user.photo_50
                        item.domain = user.domain
                    }
                })
                return newComments.push(item)
            })
            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: newComments
            })
        }
        catch(e) {
            dispatch({
                type: GET_COMMENTS_FAIL,
                error: true,
                payload: new Error(e)
            })
        }

    })
}

export function uploadPhoto(id) {
    return (dispatch) => {
        VK.Api.call('photos.getUploadServer', { album_id: id, v: 5.80},(r) => {
            let photo = r.response.upload_url
            dispatch({
                type: GET_SERVICE_SUCCESS,
                payload: r.response.upload_url
            })
        })
    }
}