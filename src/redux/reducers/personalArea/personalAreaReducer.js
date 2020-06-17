import {setCurrentMenuItem} from '../../actions/personalArea/createActions.js';
import {handleActions} from 'redux-actions';

const initialState = {
  currentMenuItem: '',
};

export const personalArea = handleActions(
  {
    [setCurrentMenuItem]: (state, currentMenuItem) => {
      return {...state, currentMenuItem: currentMenuItem.payload};
    },
  },
  initialState
);
