import React, {useEffect, useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useLocation} from 'react-router';
import PropTypes from 'prop-types';
import Search from '../search/search';
import {ActionType} from '../../store/action';
import {addForkToFavorite, getGithubForks, getGithubRepo} from '../../utils';
import favoriteLogo from './img/fav.svg';
import notFavoriteLogo from './img/no-fav.svg';
import './results.css';

const Results = ({repo, forks, saveRepo, addForks}) => {
  const urlParams = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState(
    urlParams.get('page') &&
    urlParams.get('owner') &&
    urlParams.get('repository') ?
      Number(urlParams.get('page')) :
      1,
  );

  const loadDataWithParams = async () => {
    const responseData = await getGithubRepo(
        urlParams.get('owner'),
        urlParams.get('repository'),
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
    }
  };

  useEffect(() => {
    if (urlParams.get('owner') && urlParams.get('repository')) {
      loadDataWithParams();
    }
  }, []);

  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  return (
    <div className="results">
      <div className="results__header">
        <Search />
        <span className="logo">
        «Forks»
        </span>
      </div>
      {
        repo ? (
          <div className="results__body">
            <Table bordered hover className="results__table-info">
              <thead>
                <tr><th colSpan="4">Info</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Repository owner:</th>
                  <td>{repo.owner}</td>
                </tr>
                <tr>
                  <th>Repository name:</th>
                  <td>{repo.name}</td>
                </tr>
                <tr>
                  <th>Stars count: </th>
                  <td>{repo.starsCount}</td>
                </tr>
                <tr>
                  <th>Forks count: </th>
                  <td>{repo.forksCount}</td>
                </tr>
              </tbody>
            </Table>
            <Table bordered responsive className="results__table-forks">
              <thead>
                <tr><th colSpan="4">Forks (Page #{page})</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Owner</th>
                  <th>Stars count</th>
                  <th>Link</th>
                  <th>Is favorite</th>
                </tr>
              </tbody>
              <tbody>
                {
                  forks && forks.length !== 0 && forks.map((fork) => (
                    <tr key={`${fork.owner}`}>
                      <td>{fork.owner}</td>
                      <td>{fork.starsCount}</td>
                      <td>
                        <a href={fork.url} target="blank">
                          {fork.url}
                        </a>
                      </td>
                      <td>
                        {
                          <img
                            src={fork.isFavorite ?
                              favoriteLogo : notFavoriteLogo}
                            className="favLogo"
                            onClick={() => {
                              addForkToFavorite(fork);
                            }}
                          />
                        }
                      </td>
                    </tr>
                  ))
                }
                <tr>
                  <th colSpan="4">
                    {
                      page > 1 && forks && forks.length !== 0 && (
                        <Button
                          variant="primary"
                          className="flip-btn"
                          disabled={areButtonsDisabled}
                          onClick={async () => {
                            setAreButtonsDisabled(true);

                            const newForks = await getGithubForks(
                                repo.url,
                                page - 1,
                            );

                            addForks(newForks);
                            setPage(page - 1);
                            setAreButtonsDisabled(false);
                          }}
                        >
                          &#8592; Back
                        </Button>
                      )
                    }
                    {
                      forks && forks.length !== 0 && (<Button
                        variant="primary"
                        className="flip-btn"
                        disabled={areButtonsDisabled}
                        onClick={async () => {
                          setAreButtonsDisabled(true);

                          const newForks = await getGithubForks(
                              repo.url,
                              page + 1,
                          );

                          addForks(newForks);
                          setPage(page + 1);

                          setAreButtonsDisabled(false);
                        }}
                      >
                      Next &#8594;
                      </Button>)}
                  </th>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : (
          'No repo...'
        )
      }
    </div>
  );
};

Results.propTypes = {
  repo: PropTypes.object,
  forks: PropTypes.array,
  saveRepo: PropTypes.func.isRequired,
  addForks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
  forks: state.forks,
});

const mapDispatchToProps = (dispatch) => ({
  saveRepo: (repo) => dispatch({type: ActionType.SAVE_REPO, payload: repo}),
  addForks: (forks) => dispatch({type: ActionType.ADD_FORKS, payload: forks}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
