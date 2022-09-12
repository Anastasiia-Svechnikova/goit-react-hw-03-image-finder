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

    if (
      prevProps.query !== query ||
      prevState.page !== page
    ) {    
      this.setState({ status: 'pending' });
      
      try {
        let res = null;

        if (prevProps.query !== query) {         
          this.setState({ images: [], isLoadBtnShown:true})
          res = await fetchImages(query, 1);

        } else if (page !== 1) {
          res = await fetchImages(query, page);
        } 

        if (!res.hits.length) {
          this.setState({ status: 'not found', images: [] });
          return;
        }

        this.setState(prevState => {
          return {
            status: 'resolved',
            images: [...prevState.images, ...res.hits],
            totalPages: res.totalHits,
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
    if (this.state.images.length === IMAGES_PER_PAGE) {
      this.setState({page: 2});
      return;
    }
    this.setState(prevState => {
      return { page: (prevState.page += 1) };
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
