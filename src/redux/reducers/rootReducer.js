import {
  ARTICLES_LOADED,
  CURRENT_ARTICLE_LOADED,
  SET_AUTHORIZED,
  SHOW_MODE,
  CURRENT_USER_PROFILE_LOAD,
  SET_CURRENT_MENU_ITEM,
  SET_CURRENT_PAGE,
} from '../actions/actionTypes';

const initialState = {
  listArticles: [],
  articlesCount: 0,
  isAuthorized: false,
  showMode: '',
  currentUser: {},
  currentMenuItem: null,
  showQuantity: 9,
  currentPage: 1,
};

export default function rootReducer(state = initialState, action) {
  const {
    type,
    listArticles,
    articlesCount,
    currentArticle,
    isAuthorized,
    currentUser,
    currentMenuItem,
    showMode,
    currentPage,
  } = action;
  switch (type) {
    case ARTICLES_LOADED:
      return Object.assign({}, state, {listArticles, articlesCount});
    case CURRENT_ARTICLE_LOADED:
      return Object.assign({}, state, {currentArticle});
    case SET_AUTHORIZED:
      return Object.assign({}, state, {isAuthorized});
    case SHOW_MODE:
      return Object.assign({}, state, {showMode});
    case CURRENT_USER_PROFILE_LOAD:
      return Object.assign({}, state, {currentUser});
    case SET_CURRENT_MENU_ITEM:
      return Object.assign({}, state, {currentMenuItem});
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {currentPage});
    default:
      return state;
  }
}
