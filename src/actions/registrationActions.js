import * as types from './actionTypes';
import registrationApi from '../api/mockRegistrationApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function registerToEventSuccess(registration){
  return { type: types.REGISTER_TO_EVENT_SUCCESS, registration};
}
export function cancelRegistrationSuccess(eventId){
  return { type: types.CANCEL_REGISTRATION_SUCCESS, eventId};
}
export function registerToEvent(registration){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return registrationApi.registerToEvent(registration).then(() => {
      dispatch(registerToEventSuccess(registration));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function cancelRegistration(eventId){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return registrationApi.cancelRegistration(eventId).then((eventId) => {
      dispatch(cancelRegistrationSuccess(eventId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
