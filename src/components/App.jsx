import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextButton, SearchBar } from 'components';

export class App extends Component {
  handleFormSubmit = query => {
    console.log(query);
  };
  render() {
    return (
      <div>
        <SearchBar onFormSubmit={this.handleFormSubmit} />

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
