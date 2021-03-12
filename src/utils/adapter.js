export const adaptRepoToClient = (repo) => ({
  name: repo.name,
  owner: repo.owner.login,
  starsCount: repo.stargazers_count,
  forksCount: repo.forks,
  url: repo.forks_url,
});

export const adaptForksToClient = (forks) => forks.map((fork) => ({
  id: fork.id,
  url: fork.html_url,
  starsCount: fork.stargazers_count,
  owner: fork.owner.login,
  isFavorite: false,
}));
