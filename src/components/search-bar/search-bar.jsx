import React, {useRef} from 'react';
import {Form} from 'react-bootstrap';
import './search-bar.css';

const SearchBar = () => {
  const inputRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <Form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        ref={inputRef}
        required
      />
      <Form.Text className="text-muted">
        Search for any GitHub repository
      </Form.Text>
    </Form>
  );
};

export default SearchBar;
