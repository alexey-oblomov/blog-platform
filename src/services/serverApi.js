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

export function currentUserRequest() {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + 'user';
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

export function getArticlesFromServerRequest(quantity, username, offset) {
  const header = getAuthorizationHeader();
  const articlesQuantity = 'articles?limit=' + quantity;
  const authorFilter = username ? '&author=' + username : '';
  const articlesOffset = offset ? `&offset=${offset}` : '';
  const url = baseApiUrl + articlesQuantity + authorFilter + articlesOffset;
  return axios.get(url, header);
}

export function favoriteArticleRequest(slug) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.post(url, null, header);
}

export function unfavoriteArticleRequest(slug) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + `articles/${slug}/favorite`;
  return axios.delete(url, header);
}

export function createArticleRequest(data) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + 'articles';
  return axios.post(url, data, header);
}

export function deleteArticleRequest(slug) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + `articles/${slug}`;
  return axios.delete(url, header);
}

export function getUserProfileRequest(username) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + `profiles/${username}`;
  return axios.get(url, header);
}

export function updateArticleRequest(slug, data) {
  const header = getAuthorizationHeader();
  const url = baseApiUrl + `articles/${slug}`;
  return axios.put(url, data, header);
}
