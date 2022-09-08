import PropTypes from 'prop-types';

import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import axios from 'axios';
import { ImageGalleryItem, Loader, TextButton } from 'components';

export class ImageGallery extends Component {
  static URL =
    'https://pixabay.com/api/?key=29314851-8b512a5abc572021537d02a85&q=';
  state = {
    status: 'idle',
      images: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
        this.setState({ status: 'pending' });
      try {
        const result = await axios.get(
          `${ImageGallery.URL}${this.props.query}`
        );
        if (!result.data.hits.length) {
          this.setState({ status: 'rejected' });
          return;
        }
        this.setState({
          status: 'resolved',
          images: result.data.hits,
        });
      } catch {
        this.setState({ status: 'rejected' });
      }
    }
  }
    // handleLoadMore = () => {
    //     this.setState
    // }
  render() {
    const { status, images } = this.state;
      if (status === 'pending') {   
      return <Loader/>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={s.gallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem key={id} tags={tags} image={webformatURL} />
            ))}
          </ul>
          <TextButton />
        </>
      );
    }
    if (status === 'rejected') {
      return (
        <p>
          Oops, seems like there is nothing found... Try another search, please!
        </p>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
