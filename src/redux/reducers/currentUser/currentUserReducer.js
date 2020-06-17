import {setAuthorized, setCurrentUserProfile} from '../../actions/currentUser/createActions.js';
import {handleActions} from 'redux-actions';

const initialState = {
  isAuthorized: false,
  currentUser: {},
};

export const currentUser = handleActions(
  {
    [setAuthorized]: (state, action) => {
      const {isAuthorized} = action.payload;
      return {...state, isAuthorized};
    },
    [setCurrentUserProfile]: (state, action) => {
      const {currentUser} = action.payload;
      return {...state, currentUser};
    },
  },
  initialState
);
