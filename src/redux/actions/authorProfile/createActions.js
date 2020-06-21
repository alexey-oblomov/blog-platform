import {createAction} from 'redux-actions';
import {
  LOAD_AUTHOR_PROFILE_STARTED,
  LOAD_AUTHOR_PROFILE__SUCCESS,
  LOAD_AUTHOR_PROFILE__FAILURE,
} from './actionTypes';
import {getUserProfileRequest} from '../../../services/serverApi';

export const loadAuthorProfileStarted = createAction(LOAD_AUTHOR_PROFILE_STARTED);
export const loadAuthorProfileSuccess = createAction(LOAD_AUTHOR_PROFILE__SUCCESS);
export const loadAuthorProfileFailure = createAction(LOAD_AUTHOR_PROFILE__FAILURE);

export const loadAuthorProfile = author => dispatch => {
  dispatch(loadAuthorProfileStarted({isLoading: true}));
  getUserProfileRequest(author)
    .then(response => {
      const {profile} = response.data;
      dispatch(loadAuthorProfileSuccess({isLoading: false, isError: false, profile}));
    })
    .catch(err => {
      dispatch(loadAuthorProfileFailure({isLoading: false, isError: true}));
    });
};
