import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class PhotoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            isAdaptive: false
        }
    }

    windowWidthListener = () => {
        if(window.innerWidth < 768) {
            this.setState({
                isAdaptive: true
            })
        } else {
            this.setState({
                isAdaptive: false
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowWidthListener);
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowWidthListener);
    }


    toLocalTime = (time) => {
        let date = new Date(time*1000)
        return date.toLocaleDateString()
    }

    showComments = (id, user_id) => {
        this.props.getComments(id, user_id)
        this.setState({
            show: !this.state.show
        })
        this.refs.btnComments.setAttribute("disabled", "disabled");
    }

    render() {
        const {photo, comments, fetching, error} = this.props
        return(
            <div>
                <div>
                    <div>
                        <img src={this.state.isAdaptive || window.innerWidth < 768 ? photo.photo.photo_604 : photo.photo.photo_807 || photo.photo.photo_604}  alt=""/>
                    </div>
                </div>
                <div>
                    <p><b>Text: </b>{photo.photo.text}</p>
                    <p><b>Date: </b>{this.toLocalTime(photo.photo.date)}</p>
                    <p><b>Likes: </b>❤ {photo.photo.likes.count}</p>
                    <p><b>Comments: </b>{photo.photo.comments.count}</p>
                    {photo.photo.comments.count > 0 ? <button ref="btnComments" className='btn btn__comments' onClick={() => this.showComments(photo.photo.id, photo.photo.owner_id)}>Show comments</button> : ''}
                    { error ? <p className='error'>Error in loading comments</p> : '' }
                    {
                        fetching ?
                            <p>Loading...</p>
                            :
                            comments.map( comment =>
                                <div key={comment.id} className='comment'>
                                    <a href={`https://vk.com/${comment.domain}`}><img className='comment__image' src={comment.photo_50} alt=''/></a>
                                    <p className='comment__text'>
                                        {comment.text.indexOf('],') > 0 ? <a className='comment__link' href={`https://vk.com/${comment.domain}`}>{comment.text.split('],')[0].split('|')[1]},</a> : comment.text}
                                        {comment.text.indexOf('],') > 0 ? comment.text.split('],')[1] : ''}
                                    </p>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }

}

PhotoItem.propTypes = {
    photo: PropTypes.object.isRequired
}

