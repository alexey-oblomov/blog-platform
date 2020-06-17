import {createAction} from 'redux-actions';
import {SET_FILTER_BY_AUTHOR} from './actionTypes';
import {getArticlesFromServerRequest} from '../../../services/serverApi';

export const setFilterByAuthor = createAction(SET_FILTER_BY_AUTHOR);

export const loadArticlesStarted = createAction('LOAD_ARTICLES_STARTED');
export const loadArticlesSuccess = createAction('LOAD_ARTICLES_SUCCESS');
export const loadArticlesFailure = createAction('LOAD_ARTICLES_FAILURE');

export const loadArticles = (showQuantity, offsetArticles, filterByAuthor) => dispatch => {
  dispatch(loadArticlesStarted({isLoad: true}));
  getArticlesFromServerRequest(showQuantity, offsetArticles, filterByAuthor)
    .then(response => {
      const {articles: listArticles, articlesCount} = response.data;
      dispatch(loadArticlesSuccess({isLoad: false, isError: false, listArticles, articlesCount}));
    })
    .catch(err => {
      dispatch(loadArticlesFailure({isError: true}));
    });
};
