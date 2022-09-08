import PropTypes from 'prop-types';
import React, { Component } from 'react';
 import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IconButton } from 'components';
import s from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    query: '',
  };
  handleInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleFormSubmit = e => {
    e.preventDefault();

    if (!this.state.query.trim()) {    
      toast.warning("Enter your query please!");
    }
      
    this.props.onFormSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleFormSubmit}>
          <IconButton type="submit" />

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            onChange={this.handleInput}
            autoFocus
            value={this.state.query}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
