import {
  loadAuthorProfileStarted,
  loadAuthorProfileSuccess,
  loadAuthorProfileFailure,
} from '../../actions/authorProfile/createActions';
import {handleActions} from 'redux-actions';
import {defaultAvatarUrl} from '../../../services/paths';

const initialState = {
  profile: {
    image: defaultAvatarUrl,
    isLoading: false,
    isError: false,
  },
};

export const authorProfile = handleActions(
  {
    [loadAuthorProfileStarted]: (state, action) => {
      const {isLoading} = action.payload;
      return {...state, isLoading};
    },

    [loadAuthorProfileSuccess]: (state, action) => {
      const {isLoading, isError, profile} = action.payload;
      return {...state, isLoading, isError, profile};
    },

    [loadAuthorProfileFailure]: (state, action) => {
      const {isLoading, isError} = action.payload;
      return {...state, isLoading, isError};
    },
  },
  initialState
);
