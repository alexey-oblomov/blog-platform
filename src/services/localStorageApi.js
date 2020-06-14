export function isAuth() {
  return localStorage.getItem('token') ? true : false;
}

export function setTokenToLocalStorage(token) {
  return localStorage.setItem('token', token);
}
