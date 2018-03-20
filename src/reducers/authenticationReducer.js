import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function AuthenticationReducer(state = initialState.isAuthenticated, action){

  switch(action.type){
    case types.AUTHENTICATED:
      return true;
    case types.NOT_AUTHENTICATED:
        return false;
    default:
      return state;
  }

}
