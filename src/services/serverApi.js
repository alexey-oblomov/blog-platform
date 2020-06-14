import axios from 'axios';
import {baseApiUrl} from './paths';

export const getAuthorizationHeader = () => {
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

const header = getAuthorizationHeader();

export function currentUserRequest() {
  const url = baseApiUrl + 'user';
  return axios.get(url, header);
}

export function loadAllArticlesRequest(quantity) {
  const url = baseApiUrl + 'articles?limit=' + quantity;
  return axios.get(url, header);
}

export function loadUserArticlesRequest(quantity, username) {
  const url = baseApiUrl + 'articles?limit=' + quantity + '&author=' + username;
  return axios.get(url, header);
}

export function loginRequest(loginData) {
  const url = baseApiUrl + 'users/login';
  return axios.post(url, loginData);
}

export function signupRequest(regData) {
  const url = baseApiUrl + 'users';
  return axios.post(url, regData);
}

export function loadAllArticlesWithOffsetRequest(quantity, offset) {
  const url = baseApiUrl + `articles?limit=${quantity}&offset=${offset}`;
  return axios.get(url, header);
}

export function loadUserlArticlesWithOffsetRequest(quantity, username, offset) {
  const url = baseApiUrl + `articles?limit=${quantity}&author=${username}&offset=${offset}`;
  return axios.get(url, header);
}

// export function loadArticleRequest(slug) {
//   const url = baseApiUrl + `articles/${slug}`;
//   return axios.get(url, header);
// }

export function favoriteArticleRequest(slug) {
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.post(url, null, header);
}

export function unfavoriteArticleRequest(slug) {
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.delete(url, header);
}

export function createArticleRequest(data) {
  const url = baseApiUrl + 'articles';
  return axios.post(url, data, header);
}

export function deleteArticleRequest(slug) {
  const url = baseApiUrl + `articles/${slug}`;
  return axios.delete(url, header);
}

export function loadUserProfileRequest(username) {
  const url = baseApiUrl + `profiles/${username}`;
  return axios.get(url, header);
}

export function updateArticleRequest(slug, data) {
  const url = baseApiUrl + `articles/${slug}`;
  return axios.put(url, data, header);
}
