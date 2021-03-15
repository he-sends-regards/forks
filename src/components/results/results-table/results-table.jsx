import React from 'react';
import {Table, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Search from '../../search/search';
import favoriteLogo from './img/fav.svg';
import notFavoriteLogo from './img/no-fav.svg';
import './results-table.css';

const ResultsTable = ({
  repo,
  forks,
  page,
  onPageBtnClick,
  areButtonsDisabled,
  onAddToFavClick,
}) => {
  return (
    <div className="results">
      <div className="results__header">
        <Search />
        <span className="logo">«Forks»</span>
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
                  forks && forks.length !== 0 &&
                    forks.map((fork) => (
                      <tr key={fork.id}>
                        <td>{fork.owner}</td>
                        <td>{fork.starsCount}</td>
                        <td>
                          <a href={fork.url} target="blank">{fork.url}</a>
                        </td>
                        <td>
                          {
                            <img
                              src={fork.isFavorite ?
                                favoriteLogo : notFavoriteLogo}
                              className="favLogo"
                              onClick={() => {
                                onAddToFavClick(fork);
                              }}
                            />
                          }
                        </td>
                      </tr>
                    ))
                }
                {
                  forks && forks.length !== 0 && (
                    <tr>
                      <th colSpan="4">
                        {
                          page > 1 && (
                            <Button
                              variant="primary"
                              className="flip-btn"
                              disabled={areButtonsDisabled}
                              onClick={onPageBtnClick}
                            >
                              &#8592; Back
                            </Button>
                          )
                        }
                        {
                          repo.forksCount / 5 !== page && (
                            <Button
                              variant="primary"
                              className="flip-btn"
                              disabled={areButtonsDisabled}
                              onClick={onPageBtnClick}
                            >
                              Next &#8594;
                            </Button>
                          )
                        }
                      </th>
                    </tr>
                  )
                }
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

ResultsTable.propTypes = {
  repo: PropTypes.object,
  forks: PropTypes.array,
  favoriteForks: PropTypes.array,
  page: PropTypes.number.isRequired,
  onPageBtnClick: PropTypes.func.isRequired,
  onAddToFavClick: PropTypes.func.isRequired,
  areButtonsDisabled: PropTypes.bool.isRequired,
};

export default (ResultsTable);
