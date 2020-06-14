import {ARTICLES_LOAD, SET_FILTER_BY_AUTHOR} from '../actions/actionTypes';

const initialState = {
  listArticles: [],
  articlesCount: 0,
  filterByAuthor: '',
  showQuantity: 9,
};

export function articles(state = initialState, action) {
  const {type, listArticles, articlesCount, filterByAuthor} = action;
  switch (type) {
    case ARTICLES_LOAD:
      return {...state, listArticles, articlesCount};
    case SET_FILTER_BY_AUTHOR:
      return {...state, filterByAuthor};
    default:
      return state;
  }
}
