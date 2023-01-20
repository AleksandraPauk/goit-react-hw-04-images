import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchStyle,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <SearchStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          name="inputName"
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchStyle>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
