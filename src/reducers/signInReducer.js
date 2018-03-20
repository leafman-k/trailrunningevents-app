import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function signInReducer(state = initialState.user, action){
  switch(action.type){
    case types.SIGNIN_SUCCESS:
      return Object.assign({}, action.user);
    case types.SIGNOUT_SUCCESS:
        return Object.assign({role:'QUEST'});
    default:
      return state;
  }
}
