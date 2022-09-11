import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {



    render() {
        return (
            <div className={s.overlay}>
                <div classname={s.modal}>
                    <img src={this.props.largeImageUrl} alt={this.props.tags} />

                </div>
        </div>
    )
    }
    
}
Modal.propTypes = {
    largeImageUrl: PropTypes.string.isRequired,
    tags: PropTypes.string
}