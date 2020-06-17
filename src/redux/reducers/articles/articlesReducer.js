import {
  setFilterByAuthor,
  loadArticlesStarted,
  loadArticlesSuccess,
  loadArticlesFailure,
} from '../../actions/articles/createActions.js';
import {handleActions} from 'redux-actions';
import {getArticlesFromServerRequest} from '../../../services/serverApi';
const initialState = {
  listArticles: [],
  articlesCount: 0,
  filterByAuthor: '',
  showQuantity: 9,
  isError: false,
  isLoad: false,
};

export const articles = handleActions(
  {
    [loadArticlesStarted]: (state, action) => {
      const {isLoad} = action.payload;
      return {...state, isLoad};
    },
    [loadArticlesSuccess]: (state, action) => {
      const {isLoad, isError, listArticles, articlesCount} = action.payload;
      return {...state, isLoad, isError, listArticles, articlesCount};
    },
    [loadArticlesFailure]: (state, action) => {
      const {isLoad, isError} = action.payload;
      return {...state, isLoad, isError};
    },

    [setFilterByAuthor]: (state, action) => {
      const {filterByAuthor} = action.payload;
      return {...state, filterByAuthor};
    },
  },
  initialState
);

// export const addTodo = async () => {
//   return (dispatch) => {
//     dispatch(loadArticlesStarted());

//     axios
//       .post(`https://jsonplaceholder.typicode.com/todos`, {
//         title,
//         userId,
//         completed: false,
//       })
//       .then((res) => {
//         dispatch(loadArticlesSuccess(listArticles));
//       })
//       .catch((err) => {
//         dispatch(addTodoFailure(err.message));
//       });
//   };
// };

export const loadArticlesAsync = async props => {
  return dispatch => {
    const {
      filterByAuthor,
      showQuantity,
      loadArticlesStarted,
      loadArticlesSuccess,
      loadArticlesFailure,
    } = props;

    dispatch(loadArticlesStarted({isLoad: true}));
    const offsetArticles = null;
    getArticlesFromServerRequest(showQuantity, offsetArticles, filterByAuthor)
      .then(response => {
        const {articles: listArticles, articlesCount} = response.data;
        dispatch(loadArticlesSuccess({isLoad: false, isError: false, listArticles, articlesCount}));
      })
      .catch(() => dispatch(loadArticlesFailure({isError: true})));
  };
};
