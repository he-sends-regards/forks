import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useLocation} from 'react-router';
import PropTypes from 'prop-types';
import ResultsTable from './results-table/results-table';
import {
  getGithubForks,
  getGithubRepo,
  changeForkFavoriteStatus,
  getFavoriteForks,
} from '../../api/api';
import {ActionType} from '../../store/action';

const Results = ({
  repo,
  forks,
  saveRepo,
  addForks,
  changeForkFavStatus,
  addFavoriteForks,
}) => {
  const urlParams = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState(Number(urlParams.get('page') || 1));
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const onPageBtnClick = async (evt) => {
    evt.preventDefault();
    setAreButtonsDisabled(true);

    const btnText = evt.target.textContent;

    const newForks = await getGithubForks(
        repo.url,
        btnText.includes('Next') ? page + 1 : page - 1,
    );
    const favoriteForks = await getFavoriteForks();

    addForks(newForks.map((fork) => Object.assign({}, fork, {
      isFavorite: favoriteForks.includes(fork.id),
    })));

    setPage(btnText.includes('Next') ? page + 1 : page - 1);
    setAreButtonsDisabled(false);
  };

  const onAddToFavClick = (fork) => {
    changeForkFavoriteStatus(fork);
    changeForkFavStatus(fork);
  };

  const loadDataWithParams = async () => {
    const responseData = await getGithubRepo(
        urlParams.get('owner'),
        urlParams.get('repository'),
        urlParams.get('page'),
    );

    if (responseData) {
      const favoriteForks = await getFavoriteForks();
      addFavoriteForks(favoriteForks);

      saveRepo(responseData.repository);
      addForks(responseData.forks.map((fork) => Object.assign({}, fork, {
        isFavorite: favoriteForks.includes(fork.id),
      })));

      saveRepo(responseData.repository);
      addForks(responseData.forks);
    }
  };

  useEffect(() => {
    if (urlParams.get('owner') && urlParams.get('repository')) {
      loadDataWithParams();
    }
  }, []);

  return (
    <ResultsTable
      repo={repo}
      forks={forks}
      page={page}
      onPageBtnClick={onPageBtnClick}
      areButtonsDisabled={areButtonsDisabled}
      onAddToFavClick={onAddToFavClick}
    />
  );
};

Results.propTypes = {
  repo: PropTypes.object,
  forks: PropTypes.array,
  saveRepo: PropTypes.func.isRequired,
  addForks: PropTypes.func.isRequired,
  favoriteForks: PropTypes.array,
  changeForkFavStatus: PropTypes.func.isRequired,
  addFavoriteForks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
  forks: state.forks,
  favoriteForks: state.favoriteForks,
});

const mapDispatchToProps = (dispatch) => ({
  saveRepo: (repo) => dispatch({type: ActionType.SAVE_REPO, payload: repo}),
  addForks: (forks) => dispatch({type: ActionType.ADD_FORKS, payload: forks}),
  changeForkFavStatus: (fork) => dispatch({
    type: ActionType.CHANGE_FORK_FAV_STATUS,
    payload: fork,
  }),
  addFavoriteForks: (favoriteForks) => dispatch({
    type: ActionType.ADD_FAVORITE_FORKS,
    payload: favoriteForks,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
