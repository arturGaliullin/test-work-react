import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import DropzoneComponent from 'react-dropzone-component'
import ReactDOMServer from 'react-dom/server'

import 'react-select/dist/react-select.css'

export default class Upload extends Component {

    loadToAlbum = (id) => {
        console.log(id)
        this.props.uploadPhoto(id)
    }

    handleFileAdded = (file) => {
        console.log(file)
    }

    render() {
        const albums = this.props.albums
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            dropzoneSelector: '.dropzone',
            postUrl: this.props.upload_url
        }
        const djsConfig = {
            acceptedFiles: "image/jpeg,image/png,image/gif",
            addRemoveLinks: false,
            params: {
                myParameter: "I'm a parameter!"
            },
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                    <div className="dz-details">
                        <img data-dz-thumbnail="true" />
                        <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
                    </div>
                </div>
            )
        }

        const options = albums.map(item => ({
            label: item.title,
            value: item.id
        }))

        const eventHandlers = {
            addedfile: this.handleFileAdded,
            sending: this.handleFileAdded
        }
        const albumItems = albums.map(item =>
            <div key={item.id} onClick={() => this.loadToAlbum(item.id)}>{item.title}</div>
        )
        return(
            <div>
                <p>Select a folder</p>
                <div>
                    {albumItems}
                </div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        )
    }

}

