import React from 'react';
import {Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './search-bar.css';

const SearchBar = ({setInputValue}) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search"
      className="mr-sm-2"
      required
      onChange={(evt) => setInputValue(evt.target.value)}
    />
  );
};

SearchBar.propTypes = {
  setInputValue: PropTypes.func.isRequired,
};

export default SearchBar;
