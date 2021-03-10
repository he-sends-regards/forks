import React from 'react';
import {Form, Button, Spinner, Toast} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './search-form.css';

const SearchForm = ({
  onOwnerInputChange,
  onRepositoryInputChange,
  handleSubmit,
  isFormDisabled,
  error,
  setError,
}) => {
  return (
    <Form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <Toast
        show={error.length !== 0}
        onClose={() => setError('')}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          top: '40%',
          zIndex: 1,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Forks</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>

      </Toast>
      <div className="search-form__input-group">
        <span>
          https://github.com/
        </span>

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

      {
        isFormDisabled ?
          <Spinner animation="grow" style={{maxHeight: '100%'}}/> :
          <Button
            className="text-uppercase"
            type="submit"
            variant="success"
            disabled={isFormDisabled}
          >
            find
          </Button>
      }
    </Form>
  );
};

SearchForm.propTypes = {
  onOwnerInputChange: PropTypes.func.isRequired,
  onRepositoryInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

export default SearchForm;
