import {createAction} from 'redux-actions';
import {SET_AUTHORIZED, CURRENT_USER_PROFILE_LOAD} from './actionTypes';

export const setAuthorized = createAction(SET_AUTHORIZED);
export const setCurrentUserProfile = createAction(CURRENT_USER_PROFILE_LOAD);
