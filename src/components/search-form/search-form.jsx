import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import SearchBar from './search-bar/search-bar';
import './search-form.css';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(inputValue);
  };

  return (
    <Form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <SearchBar setInputValue={setInputValue} />

      <Form.Text className="text-muted">
        {
          inputValue.length === 0 ?
            'Search for any GitHub repository' :
            'Press Enter...'
        }
      </Form.Text>
    </Form>
  );
};

export default SearchForm;
