import React, {useState} from 'react';
import {useHistory} from 'react-router';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import SearchForm from './search-form/search-form';
import {connect} from 'react-redux';
import {ActionType} from '../../store/action';
import {getGithubRepo, getFavoriteForks} from '../../api/api';

const Search = ({saveRepo, addForks, addFavoriteForks}) => {
  const [ownerInputValue, setOwnerInputValue] = useState('');
  const [repositoryInputValue, setRepositoryInputValue] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const onOwnerInputChange = (evt) => {
    setOwnerInputValue(evt.target.value);
  };
  const onRepositoryInputChange = (evt) => {
    setRepositoryInputValue(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsFormDisabled(true);

    const responseData = await getGithubRepo(
        ownerInputValue,
        repositoryInputValue,
    );

    if (responseData) {
      const favoriteForks = await getFavoriteForks();
      addFavoriteForks(favoriteForks);

      saveRepo(responseData.repository);
      addForks(responseData.forks.map((fork) => Object.assign({}, fork, {
        isFavorite: favoriteForks.includes(fork.id),
      })));

      setIsFormDisabled(false);
      history.push(AppRoute.SEARCH);
    } else {
      setIsFormDisabled(false);
      setError('Such user/organization or repository is missing in GitHub');
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

Search.propTypes = {
  saveRepo: PropTypes.func.isRequired,
  addForks: PropTypes.func.isRequired,
  addFavoriteForks: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveRepo: (repo) => dispatch({type: ActionType.SAVE_REPO, payload: repo}),
  addForks: (forks) => dispatch({type: ActionType.ADD_FORKS, payload: forks}),
  addFavoriteForks: (favoriteForks) => dispatch({
    type: ActionType.ADD_FAVORITE_FORKS,
    payload: favoriteForks,
  }),
});

export default connect(null, mapDispatchToProps)(Search);
