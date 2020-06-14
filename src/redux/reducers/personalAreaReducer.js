import {SET_CURRENT_MENU_ITEM} from '../actions/actionTypes';

const initialState = {
  currentMenuItem: '',
};

export function personalArea(state = initialState, action) {
  const {type, currentMenuItem} = action;
  switch (type) {
    case SET_CURRENT_MENU_ITEM:
      return {...state, currentMenuItem};
    default:
      return state;
  }
}
