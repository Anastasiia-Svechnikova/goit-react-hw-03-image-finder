import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';
import { Modal } from 'components';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const { image, tags, largeImage, imageWidth, webformatWidth } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li className={s.item} onClick={this.handleOpenModal}>
          <img
            className={s.image}
            src={image}
            alt={tags}
            width={webformatWidth}
          />
        </li>
        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={largeImage} alt={tags} width={imageWidth} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
  imageWidth: PropTypes.number.isRequired,
  webformatWidth: PropTypes.number.isRequired,
};
