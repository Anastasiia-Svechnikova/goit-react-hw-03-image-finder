import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem, Loader, TextButton } from 'components';
import { fetchImages } from 'helpers';

export class ImageGallery extends Component {
  state = {
    status: 'idle',
    images: [],
    page: 1,
    totalPages: 0, 
    perPage: 20,
    isLoadBtnShown: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, perPage } = this.state

    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {    
      this.setState({ status: 'pending' });
      
      try {
        let res = [];

        if (prevProps.query !== this.props.query) {         
          this.setState({ images: [], isLoadBtnShown:true})
          res = await fetchImages(this.props.query, 1);

        } else if (page !== 1) {
          res = await fetchImages(this.props.query, page);
        } 

        if (!res.hits.length) {
          this.setState({ status: 'not found', images: [] });
          return;
        }
console.log(res)
        this.setState(prevState => {
          return {
            status: 'resolved',
            images: [...prevState.images, ...res.hits],
            totalPages: res.totalHits,
            isLoadBtnShown: (res.totalHits > perPage && ((res.totalHits / page) > perPage))
          };
        });

      }
      catch {
        console.log('fuck')
        this.setState({ status: 'rejected' });
      }
    }
  }


  handleLoadMore = () => {
    if (this.state.images.length === 20) {
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
          {images.map(({ id, tags, webformatURL, largeImageURL, imageWidth, webformatWidth }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              image={webformatURL}
              largeImage={largeImageURL}
              imageWidth={imageWidth}
              webformatWidth={webformatWidth}
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
