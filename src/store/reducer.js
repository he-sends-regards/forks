import {ActionType} from './action';

export const initialState = {
  repo: null,
  forks: null,
  favoriteForks: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_REPO:
      return Object.assign({}, state, {
        repo: action.payload,
      });

    case ActionType.ADD_FORKS:
      return Object.assign({}, state, {
        forks: action.payload,
      });

    case ActionType.ADD_FAVORITE_FORKS:
      return Object.assign({}, state, {
        favoriteForks: action.payload,
      });

    case ActionType.CHANGE_FORK_FAV_STATUS:
      return Object.assign({}, state, {
        forks: state.forks.map((fork) => {
          if (fork.id === action.payload.id) {
            return Object.assign({}, fork, {
              isFavorite: !fork.isFavorite,
            });
          }
          return fork;
        }),
      });

    default:
      return state;
  }
};
