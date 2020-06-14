import {SET_AUTHORIZED, CURRENT_USER_PROFILE_LOAD} from '../actions/actionTypes';

const initialState = {
  isAuthorized: false,
  currentUser: {},
};

export function currentUser(state = initialState, action) {
  const {type, isAuthorized, currentUser} = action;
  switch (type) {
    case SET_AUTHORIZED:
      return {...state, isAuthorized};
    case CURRENT_USER_PROFILE_LOAD:
      return {...state, currentUser};
    default:
      return state;
  }
}
