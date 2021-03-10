import React from 'react';
import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './search-form.css';

const SearchForm = ({
  onOwnerInputChange,
  onRepositoryInputChange,
  handleSubmit,
  isFormDisabled,
}) => {
  return (
    <Form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <div className="search-form__input-group">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Owner"
            className="mr-sm-2"
            required
            onChange={onOwnerInputChange}
          />
        </Form.Group>

        <span>/</span>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Repository"
            className="mr-sm-2"
            required
            onChange={onRepositoryInputChange}
          />
        </Form.Group>
      </div>

      <Button
        className="text-uppercase"
        type="submit"
        variant="success"
        disabled={isFormDisabled}
      >
        {
          isFormDisabled ?
            'loading...' :
            'find'
        }
      </Button>
    </Form>
  );
};

SearchForm.propTypes = {
  onOwnerInputChange: PropTypes.func.isRequired,
  onRepositoryInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
};

export default SearchForm;
