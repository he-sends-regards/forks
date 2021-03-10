import React, {useState} from 'react';
import SearchForm from './search-form/search-form';
// import PropTypes from 'prop-types';

const Search = () => {
  const [ownerInputValue, setOwnerInputValue] = useState('');
  const [repositoryInputValue, setRepositoryInputValue] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');

  const onOwnerInputChange = (evt) => {
    setOwnerInputValue(evt.target.value);
  };
  const onRepositoryInputChange = (evt) => {
    setRepositoryInputValue(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsFormDisabled(true);

    const response = await fetch(`https://api.github.com/users/${ownerInputValue}/repos`);
    const data = await response.json();

    if (response.status === 200) {
      const requiredRepo = data.filter((repo) => {
        return repo.name === repositoryInputValue;
      });
      if (requiredRepo.length === 0) {
        setError('Such user or repository is missing in GitHub');
      }
      setIsFormDisabled(false);
      console.log(requiredRepo);
    } else {
      alert('Incorrect request! Try again...');
    }
  };

  return (
    <SearchForm
      onOwnerInputChange={onOwnerInputChange}
      onRepositoryInputChange={onRepositoryInputChange}
      handleSubmit={handleSubmit}
      isFormDisabled={isFormDisabled}
      error={error}
      setError={setError}
    />
  );
};

export default Search;
