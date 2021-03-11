export const ActionType = {
  SAVE_REPO: `SAVE_REPO`,
};

export const saveRepo = (repo) => ({
  type: ActionType.SAVE_REPO,
  payload: repo,
});
