import axios from 'axios';

export const makeHeadersForAuth = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Token ${token}`,
  };
};

export function isAuth() {
  const token = localStorage.getItem('token');
  return !!token;
}

export function getCurrentUserFromServer(headers) {
  const url = `https://conduit.productionready.io/api/user`;
  return axios.get(url, {
    headers,
  });
}

export function loadAllArticles(quantity, headers) {
  const url = 'https://conduit.productionready.io/api/articles?limit=' + quantity;
  return axios.get(url, {headers});
}

export function loadUserArticles(quantity, username, headers) {
  const url =
    'https://conduit.productionready.io/api/articles?limit=' + quantity + '&author=' + username;
  return axios.get(url, {headers});
}

export function serverAuthorization(loginData) {
  const url = 'https://conduit.productionready.io/api/users/login';
  return axios.post(url, loginData);
}

export function serverRegistration(regData) {
  const url = 'https://conduit.productionready.io/api/users';
  return axios.post(url, regData);
}

export function loadAllArticlesWithOffset(quantity, offset, headers) {
  const url = `https://conduit.productionready.io/api/articles?limit=${quantity}&offset=${offset}`;
  return axios.get(url, {headers});
}

export function loadUserlArticlesWithOffset(quantity, username, offset, headers) {
  const url = `https://conduit.productionready.io/api/articles?limit=${quantity}&author=${username}&offset=${offset}`;
  return axios.get(url, {headers});
}

export function loadArticle(slug, headers) {
  const url = `https://conduit.productionready.io/api/articles/${slug}`;
  return axios.get(url, {headers});
}

export function likeIt(slug, headers) {
  const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
  return axios.post(url, null, {
    headers,
  });
}

export function unLikeIt(slug, headers) {
  const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
  return axios.delete(url, {
    headers,
  });
}

export function createArticle(data, headers) {
  const url = 'https://conduit.productionready.io/api/articles';
  return axios.post(url, data, {headers});
}

export function deleteArticleFromServer(slug, headers) {
  const url = `https://conduit.productionready.io/api/articles/${slug}`;
  return axios.delete(url, {headers});
}

export function getCurrentUser(headers) {
  const url = 'https://conduit.productionready.io/api/user';
  return axios.get(url, {
    headers,
  });
}

export function loadUserProfile(username, headers) {
  const url = `https://conduit.productionready.io/api/profiles/${username}`;
  return axios.get(url, {
    headers,
  });
}

export function updateArticle(slug, data, headers) {
  const url = `https://conduit.productionready.io/api/articles/${slug}`;
  return axios.put(url, data, {headers});
}
