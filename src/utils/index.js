export const getGithubForks = async (forksUrl, page=1, count=5) => {
  const response = await fetch(`${forksUrl}?page=${page}&per_page=${count}`);

  if (response.ok) {
    return await response.json();
  }
  return null;
};

export const getGithubRepo = async (
    owner,
    repository,
    forksPage,
    forksCount,
) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`);
  if (response.ok) {
    const repository = await response.json();

    const forks = await getGithubForks(
        repository.forks_url,
        forksPage,
        forksCount,
    );

    return {
      repository,
      forks,
    };
  }
  return null;
};
