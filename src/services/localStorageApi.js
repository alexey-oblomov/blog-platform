export function isAuth() {
  return localStorage.getItem('token') ? true : false;
}

export function setLoginDataToLocalStorage(data) {
  const {token} = data;
  return localStorage.setItem('token', token);
}
