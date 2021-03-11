import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import SearchForm from './search-form/search-form';
import {connect} from 'react-redux';
import {ActionType} from '../../store/action';
import {getGithubRepo} from '../../utils';

const Search = ({saveRepo, addForks}) => {
  const [ownerInputValue, setOwnerInputValue] = useState('');
  const [repositoryInputValue, setRepositoryInputValue] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const currentLocation = useLocation().pathname;

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
      saveRepo({
        name: responseData.repository.name,
        owner: responseData.repository.owner.login,
        starsCount: responseData.repository.stargazers_count,
        forksCount: responseData.repository.forks,
        url: responseData.repository.forks_url,
      });

      addForks(responseData.forks);

      setIsFormDisabled(false);
      setOwnerInputValue('');
      setRepositoryInputValue('');
      return currentLocation === AppRoute.ROOT &&
        history.push(AppRoute.RESULTS);
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
};

const mapDispatchToProps = (dispatch) => ({
  saveRepo: (repo) => dispatch({type: ActionType.SAVE_REPO, payload: repo}),
  addForks: (forks) => dispatch({type: ActionType.ADD_FORKS, payload: forks}),
});

export default connect(null, mapDispatchToProps)(Search);
