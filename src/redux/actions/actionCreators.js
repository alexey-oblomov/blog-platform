import {
  ARTICLES_LOAD,
  SET_AUTHORIZED,
  CURRENT_USER_PROFILE_LOAD,
  SET_FILTER_BY_AUTHOR,
  SET_CURRENT_MENU_ITEM,
} from './actionTypes';

export const articlesLoad = (listArticles, articlesCount) => {
  return {
    type: ARTICLES_LOAD,
    listArticles,
    articlesCount,
  };
};

export const setFilterByAuthor = filterByAuthor => {
  return {
    type: SET_FILTER_BY_AUTHOR,
    filterByAuthor,
  };
};

export const setAuthorized = isAuthorized => {
  return {
    type: SET_AUTHORIZED,
    isAuthorized,
  };
};

export const setCurrentUserProfile = currentUser => {
  return {
    type: CURRENT_USER_PROFILE_LOAD,
    currentUser,
  };
};

export const setCurrentMenuItem = currentMenuItem => {
  return {
    type: SET_CURRENT_MENU_ITEM,
    currentMenuItem,
  };
};
