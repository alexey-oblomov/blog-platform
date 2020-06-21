import {createAction} from 'redux-actions';
import {
  SET_FILTER_BY_AUTHOR,
  UPDATE_LIST_ARTICLES,
  LOAD_ARTICLES_STARTED,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_FAILURE,
} from './actionTypes';
import {getArticlesFromServerRequest} from '../../../services/serverApi';

export const setFilterByAuthor = createAction(SET_FILTER_BY_AUTHOR);
export const updateListArticles = createAction(UPDATE_LIST_ARTICLES);

export const loadArticlesStarted = createAction(LOAD_ARTICLES_STARTED);
export const loadArticlesSuccess = createAction(LOAD_ARTICLES_SUCCESS);
export const loadArticlesFailure = createAction(LOAD_ARTICLES_FAILURE);

export const loadArticles = (showQuantity, filterByAuthor, offsetArticles) => dispatch => {
  dispatch(loadArticlesStarted({isLoading: true}));
  getArticlesFromServerRequest(showQuantity, filterByAuthor, offsetArticles)
    .then(response => {
      const {articles: listArticles, articlesCount} = response.data;
      dispatch(
        loadArticlesSuccess({isLoading: false, isError: false, listArticles, articlesCount})
      );
    })
    .catch(err => {
      dispatch(loadArticlesFailure({isLoading: false, isError: true}));
    });
};
