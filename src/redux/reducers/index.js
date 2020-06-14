import {combineReducers} from 'redux';
import {articles} from './articlesReducer';
import {currentUser} from './currentUserReducer';
import {personalArea} from './personalAreaReducer';

export default combineReducers({
  articles,
  currentUser,
  personalArea,
});
