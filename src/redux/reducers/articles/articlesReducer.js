import {
  setFilterByAuthor,
  loadArticlesStarted,
  loadArticlesSuccess,
  loadArticlesFailure,
  updateListArticles,
} from '../../actions/articles/createActions';
import {handleActions} from 'redux-actions';

const initialState = {
  listArticles: [],
  articlesCount: 0,
  filterByAuthor: '',
  numberArticlesToDisplay: 9,
  isError: false,
  isLoading: true,
};

export const articles = handleActions(
  {
    [loadArticlesStarted]: (state, action) => {
      const {isLoading} = action.payload;
      return {...state, isLoading};
    },
    [loadArticlesSuccess]: (state, action) => {
      const {isLoading, isError, listArticles, articlesCount} = action.payload;
      return {...state, isLoading, isError, listArticles, articlesCount};
    },
    [loadArticlesFailure]: (state, action) => {
      const {isLoading, isError} = action.payload;
      return {...state, isLoading, isError};
    },

    [setFilterByAuthor]: (state, action) => {
      const {filterByAuthor} = action.payload;
      return {...state, filterByAuthor};
    },
    [updateListArticles]: (state, action) => {
      const {listArticles} = action.payload;
      return {...state, listArticles};
    },
  },
  initialState
);
