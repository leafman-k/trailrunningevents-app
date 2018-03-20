import * as types from './actionTypes';
import authApi from '../api/mockAuthApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {authenticationSuccess, logoutSuccess} from './authActions';
export function signInSuccess(user){
  return {type: types.SIGNIN_SUCCESS, user};
}
export function signOutSuccess(){
  return {type: types.SIGNOUT_SUCCESS};
}

export function signIn(credentials){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return authApi.signIn(credentials).then(authenticatedUser =>{
      dispatch(signInSuccess(authenticatedUser));
      dispatch(authenticationSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function signOut(){
  return function(dispatch){
    dispatch(signOutSuccess());
    dispatch(logoutSuccess());
  };
}
