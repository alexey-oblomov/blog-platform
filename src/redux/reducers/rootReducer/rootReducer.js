import {combineReducers} from 'redux';
import {articles} from '../articles/articlesReducer';
import {currentUser} from '../currentUser/currentUserReducer';
import {personalArea} from '../personalArea/personalAreaReducer';

export const rootReducer = combineReducers({
  articles,
  currentUser,
  personalArea,
});
