import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem, Loader, TextButton } from 'components';
import { fetchImages } from 'helpers';

const IMAGES_PER_PAGE = 20;
export class ImageGallery extends Component {
  state = {
    status: 'idle',
    images: [],
    page: 1,
    totalPages: 0, 
    isLoadBtnShown: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;
    const isNewQuery = prevProps.query !== query;
    if (
      isNewQuery ||
      (prevState.page !== page && page !== 1)
    ) {    
      this.setState({ status: 'pending' });
      
      try {
        const currentPage = isNewQuery ? 1 : page;
        const res = await fetchImages(query, currentPage);

        if (!res.hits.length) {
          this.setState({ status: 'not found', images: [] });
          return;
        }

        this.setState(prevState => {
          const images = isNewQuery ? []: prevState.images
          return {
            status: 'resolved',
            images: [...images, ...res.hits],
            totalPages: res.totalHits,
            page: currentPage,
            isLoadBtnShown: (res.totalHits > IMAGES_PER_PAGE && ((res.totalHits / page) > IMAGES_PER_PAGE))
          };
        });

      }
      catch {
        this.setState({ status: 'rejected' });
      }
    }
  }


  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: (prevState.page + 1) };
    });
  };

 

  render() {
    const { status, images, isLoadBtnShown } = this.state;

    return (
      <>
        {status === 'not found' && (
          <p>
            Oops, seems like there is nothing found... Try another search,
            please!
          </p>
        )}
        <ul className={s.gallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL}) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              image={webformatURL}
              largeImage={largeImageURL}
            />
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {(status === 'resolved' && isLoadBtnShown) && <TextButton onClick={this.handleLoadMore} />}         
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
