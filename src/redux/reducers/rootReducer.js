import {
  ARTICLES_LOADED,
  CURRENT_ARTICLE_LOADED,
  AUTHORIZED,
  SHOW_ALL,
  SHOW_MY,
  CURRENT_USER_PROFILE_LOAD,
  SET_CURRENT_MENU_ITEM,
} from '../actions/actionTypes';

const initialState = {
  articles: [],
  currentArticle: {
    title: null,
    author: {username: null},
    body: null,
    favorited: null,
    favoritesCount: null,
  },
  articlesCount: 0,
  isAutorized: false,
  show: 'all',
  currentUser: {},
  currentMenuItem: null,
};

export default function rootReducer(state = initialState, action) {
  const {
    type,
    articles,
    articlesCount,
    currentArticle,
    isAutorized,
    currentUser,
    currentMenuItem,
  } = action;
  switch (type) {
    case ARTICLES_LOADED:
      return Object.assign({}, state, {articles, articlesCount});
    case CURRENT_ARTICLE_LOADED:
      return Object.assign({}, state, {currentArticle});
    case AUTHORIZED:
      return Object.assign({}, state, {isAutorized});
    case SHOW_ALL:
      return Object.assign({}, state, {show: 'all'});
    case SHOW_MY:
      return Object.assign({}, state, {show: 'my'});
    case CURRENT_USER_PROFILE_LOAD:
      return Object.assign({}, state, {currentUser});
    case SET_CURRENT_MENU_ITEM:
      return Object.assign({}, state, {currentMenuItem});
    default:
      return state;
  }
}
