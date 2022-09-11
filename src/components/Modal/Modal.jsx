import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {

    componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e)=>{
        if (e.code === 'Escape') {
            this.props.onClose()
        }       
    }

    handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {      
            this.props.onClose()
        }  
    }
    

    render() {
        return (
            <div className={s.overlay} onClick={this.handleCloseModal}>
                <div className={s.modal}>
                    {this.props.children}
                </div>
        </div>
    )
    }
    
}
Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
}