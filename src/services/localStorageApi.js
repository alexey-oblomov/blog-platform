export function isAuth() {
  return localStorage.getItem('token') ? true : false;
}

export const setLoginDataToLocalStorage = data => {
  const {token} = data;
  localStorage.setItem('token', token);
};
