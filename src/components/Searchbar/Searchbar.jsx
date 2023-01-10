import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchStyle,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './SearchBar.styled';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <SearchStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            name="inputName"
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchStyle>
    );
  }
}
