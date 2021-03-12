import firebase from 'firebase/app';
import {adaptRepoToClient, adaptForksToClient} from '../utils/adapter';

export const getGithubForks = async (forksUrl, page=1, count=5) => {
  const response = await fetch(`${forksUrl}?page=${page}&per_page=${count}`);

  if (response.ok) {
    const forks = await response.json();
    return adaptForksToClient(forks);
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
      repository: adaptRepoToClient(repository),
      forks,
    };
  }
  return null;
};

export const getFavoriteForks = async () => {
  const favoriteForks = [];
  const db = firebase.database().ref('favoriteForks');

  await db.once('value', async (snapshot) => {
    const dbForks = await snapshot.val();
    favoriteForks.push(...Object.keys(dbForks));
  });
  return favoriteForks.map((id) => Number(id));
};

export const changeForkFavoriteStatus = (fork) => {
  if (fork.isFavorite) {
    firebase.database().ref('favoriteForks/' + fork.id).remove();
  } else {
    firebase.database().ref('favoriteForks/' + fork.id).set(fork);
  }
};
