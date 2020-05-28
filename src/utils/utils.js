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
