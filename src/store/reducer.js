import {ActionType} from './action';

export const initialState = {
  repo: null,
  forks: null,
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

    default:
      return state;
  }
};
