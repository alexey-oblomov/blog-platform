import axios from 'axios';

const baseApiUrl = 'https://conduit.productionready.io/api/';

export const getAuthorizationHeaders = () => {
  const token = localStorage.getItem('token');
  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  }
  return header;
};

const header = getAuthorizationHeaders();

export function getCurrentUser() {
  const url = baseApiUrl + 'user';
  return axios.get(url, header);
}

export function loadAllArticles(quantity) {
  const url = baseApiUrl + 'articles?limit=' + quantity;
  return axios.get(url, header);
}

export function loadUserArticles(quantity, username) {
  const url = baseApiUrl + 'articles?limit=' + quantity + '&author=' + username;
  return axios.get(url, header);
}

export function serverAuthorization(loginData) {
  const url = baseApiUrl + 'users/login';
  return axios.post(url, loginData);
}

export function serverRegistration(regData) {
  const url = baseApiUrl + 'users';
  return axios.post(url, regData);
}

export function loadAllArticlesWithOffset(quantity, offset) {
  const url = baseApiUrl + `articles?limit=${quantity}&offset=${offset}`;
  return axios.get(url, header);
}

export function loadUserlArticlesWithOffset(quantity, username, offset) {
  const url = baseApiUrl + `articles?limit=${quantity}&author=${username}&offset=${offset}`;
  return axios.get(url, header);
}

export function loadArticle(slug) {
  const url = baseApiUrl + `articles/${slug}`;
  return axios.get(url, header);
}

export function likeIt(slug) {
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.post(url, null, {
    header,
  });
}

export function unLikeIt(slug) {
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.delete(url, header);
}

export function createArticle(data) {
  const url = baseApiUrl + 'articles';
  return axios.post(url, data, header);
}

export function deleteArticleFromServer(slug) {
  const url = baseApiUrl + `articles/${slug}`;
  return axios.delete(url, header);
}

export function loadUserProfile(username) {
  const url = baseApiUrl + `profiles/${username}`;
  return axios.get(url, header);
}

export function updateArticle(slug, data) {
  const url = baseApiUrl + `articles/${slug}`;
  return axios.put(url, data, header);
}
