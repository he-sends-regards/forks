export const ActionType = {
  SAVE_REPO: `SAVE_REPO`,
  ADD_FORKS: `ADD_FORKS`,
  ADD_FAVORITE_FORKS: `ADD_FAVORITE_FORKS`,
  CHANGE_FORK_FAV_STATUS: `CHANGE_FORK_FAV_STATUS`,
};

export const saveRepo = (repo) => ({
  type: ActionType.SAVE_REPO,
  payload: repo,
});

export const addForks = (forks) => {
  return {
    type: ActionType.ADD_FORKS,
    payload: forks,
  };
};

export const changeForkFavStatus = (fork) => {
  return {
    type: ActionType.CHANGE_FORK_FAV_STATUS,
    payload: fork,
  };
};

export const addFavoriteForks = (favoriteForks) => {
  return {
    type: ActionType.ADD_FAVORITE_FORKS,
    payload: favoriteForks,
  };
};

