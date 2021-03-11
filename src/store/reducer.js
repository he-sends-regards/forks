import {ActionType} from './action';

export const initialState = {
  repo: {},
};

export default () => (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_REPO:
      return Object.assign({}, state, {
        repo: action.payload,
      });
  }
  console.log(state);
  return state;
};
