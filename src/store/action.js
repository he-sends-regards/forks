export const ActionType = {
  SAVE_REPO: `SAVE_REPO`,
  ADD_FORKS: `ADD_FORKS`,
};

export const saveRepo = (repo) => ({
  type: ActionType.SAVE_REPO,
  payload: repo,
});

export const addForks = (forks) => ({
  type: ActionType.ADD_FORKS,
  payload: forks,
});
