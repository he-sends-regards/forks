import React, {useState} from 'react';
import SearchForm from './search-form/search-form';
// import PropTypes from 'prop-types';

const Search = () => {
  const [ownerInputValue, setOwnerInputValue] = useState('');
  const [repositoryInputValue, setRepositoryInputValue] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const onOwnerInputChange = (evt) => {
    setOwnerInputValue(evt.target.value);
  };
  const onRepositoryInputChange = (evt) => {
    setRepositoryInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    console.log({
      ownerInputValue,
      repositoryInputValue,
    });
  };

  return (
    <SearchForm
      onOwnerInputChange={onOwnerInputChange}
      onRepositoryInputChange={onRepositoryInputChange}
      handleSubmit={handleSubmit}
      isFormDisabled={isFormDisabled}
    />
  );
};

export default Search;
