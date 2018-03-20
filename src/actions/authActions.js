import * as types from './actionTypes';

export function authenticationSuccess(){
  return {type: types.AUTHENTICATED};
}
export function logoutSuccess(){
  return {type: types.NOT_AUTHENTICATED};
}
