import {
  ARTICLES_LOADED,
  CURRENT_ARTICLE_LOADED,
  SET_AUTHORIZED,
  SHOW_MODE,
  CURRENT_USER_PROFILE_LOAD,
  SET_CURRENT_PAGE,
} from '../actions/actionTypes';

const initialState = {
  listArticles: [],
  articlesCount: 0,
  isAuthorized: false,
  showMode: '',
  currentUser: {},
  showQuantity: 9,
  currentPage: '',
};

export default function rootReducer(state = initialState, action) {
  const {
    type,
    listArticles,
    articlesCount,
    currentArticle,
    isAuthorized,
    currentUser,
    showMode,
    currentPage,
  } = action;
  switch (type) {
    case ARTICLES_LOADED:
      return {...state, listArticles, articlesCount};
    case CURRENT_ARTICLE_LOADED:
      return {...state, currentArticle};
    case SET_AUTHORIZED:
      return {...state, isAuthorized};
    case SHOW_MODE:
      return {...state, showMode};
    case CURRENT_USER_PROFILE_LOAD:
      return {...state, currentUser};
    case SET_CURRENT_PAGE:
      return {...state, currentPage};
    default:
      return state;
  }
}
