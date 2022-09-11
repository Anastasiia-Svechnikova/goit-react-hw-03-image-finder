import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar, ImageGallery } from 'components';

export class App extends Component {
  state = {
    query: '',
  };
  handleFormSubmit = newQuery => {
    this.setState({
      query: newQuery,

    });
  };
  render() {
    const { query} = this.state;
    return (
      <div className="app">
        <SearchBar onFormSubmit={this.handleFormSubmit} />
        <ImageGallery query={query}  />
        <ToastContainer
          position="top-right"
          theme="colored"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
