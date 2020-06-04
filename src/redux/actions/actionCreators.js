import {
  ARTICLES_LOADED,
  CURRENT_ARTICLE_LOADED,
  SET_AUTHORIZED,
  SHOW_MODE,
  CURRENT_USER_PROFILE_LOAD,
  SET_CURRENT_MENU_ITEM,
  SET_CURRENT_PAGE,
} from './actionTypes';

export const articlesLoaded = (listArticles, articlesCount) => {
  return {
    type: ARTICLES_LOADED,
    listArticles,
    articlesCount,
  };
};

export const currentArticleLoaded = currentArticle => {
  return {
    type: CURRENT_ARTICLE_LOADED,
    currentArticle,
  };
};

export const setAuthorized = isAuthorized => {
  return {
    type: SET_AUTHORIZED,
    isAuthorized,
  };
};

export const showMode = user => {
  return {
    type: SHOW_MODE,
    showMode: user,
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

export const setCurrentPage = currentPage => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};
