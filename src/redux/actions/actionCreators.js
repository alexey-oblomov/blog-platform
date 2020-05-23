import {
  ARTICLES_LOADED,
  CURRENT_ARTICLE_LOADED,
  AUTHORIZED,
  SHOW_ALL,
  SHOW_MY,
  CURRENT_USER_PROFILE_LOAD,
  SET_CURRENT_MENU_ITEM,
} from './actionTypes';

export const articlesLoaded = (articles, articlesCount) => {
  return {
    type: ARTICLES_LOADED,
    articles,
    articlesCount,
  };
};

export const currentArticleLoaded = currentArticle => {
  return {
    type: CURRENT_ARTICLE_LOADED,
    currentArticle,
  };
};

export const authorized = isAutorized => {
  return {
    type: AUTHORIZED,
    isAutorized,
  };
};

export const showAll = () => {
  return {
    type: SHOW_ALL,
    show: 'all',
  };
};

export const showMy = () => {
  return {
    type: SHOW_MY,
    show: 'my',
  };
};

export const getCurrentUserProfile = currentUser => {
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
