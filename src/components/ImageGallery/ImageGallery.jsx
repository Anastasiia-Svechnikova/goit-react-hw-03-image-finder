import PropTypes from 'prop-types';

import React, { Component } from 'react';
import s from './ImageGallery.module.css';
// import axios from 'axios';
import { ImageGalleryItem, Loader, TextButton } from 'components';
import { fetchImagesByQuery, fetchImagesByPage } from 'helpers/Api';

export class ImageGallery extends Component {
 
  state = {
    status: 'idle',
    images: [],

  };

   async componentDidUpdate(prevProps, prevState) {
     if (prevProps.query !== this.props.query ) {
       this.setState({ page: 1 });

       this.setState({ status: 'pending' });

      try {
        const res = await fetchImagesByQuery(this.props.query)
        if (!res.length) {
          this.setState({ status: 'not found' , images: []});
          return;
        }
        this.setState({
          images: res,
          status: 'resolved',
        })

      } catch {
        this.setState({ status: 'rejected' })
      }
     }
     else if(prevState.page !== this.state.page) {
       this.setState({ status: 'loading' });
       try {
         const res = await fetchImagesByPage(this.props.query, this.state.page)
         console.log(res)
        if (!res.length) {
          this.setState({ status: 'not found', images: [] });
          return;
        }
         this.setState(prevState => {
           return{nextImages: res, status: 'resolved'}
         })

      } catch {
        this.setState({ status: 'rejected' })
      }
     }
  }
    handleLoadMore = () => {
      this.setState(prevState => {
        console.log(this.state.page)
        return{page: prevState.page += 1}
      })
    }
  
  render() {
    const { status, images } = this.state;
    
    
      return (
        <>
         
          {status === 'not found' && <p>
          Oops, seems like there is nothing found... Try another search, please!
        </p>}
          <ul className={s.gallery}>
            { images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem key={id} tags={tags} image={webformatURL} largeImage={largeImageURL} onClick={this.handleOpenModal } />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {status === 'resolved' && < TextButton onClick={this.handleLoadMore} />}
          
        </>
      );
      
    
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired
};
