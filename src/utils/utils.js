export const makeHeadersForAuth = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Token ${token}`,
  };
};

export function isAuth() {
  const username = localStorage.getItem('username');
  return !!username;
}
