import * as types from './actionTypes';
import eventApi from '../api/mockEventApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEventSuccess(events){
  return { type: types.LOAD_EVENTS_SUCCESS, events};
}
export function createEventSuccess(event){
  return {type: types.CREATE_EVENT_SUCCESS, event};
}
export function updateEventSuccess(event){
  return {type: types.UPDATE_EVENT_SUCCESS, event};
}
export function deleteEventSuccess(eventId){
  return {type: types.DELETE_EVENT_SUCCESS, eventId};
}
export function loadEvents(){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return eventApi.getAllEvents().then(events =>{
      dispatch(loadEventSuccess(events));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveEvent(event){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return eventApi.saveEvent(event).then(savedEvent => {
      event.id != 0 ? dispatch(updateEventSuccess(savedEvent)) :
        dispatch(createEventSuccess(savedEvent));
      }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteEvent(eventId){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return eventApi.deleteEvent(event).then(eventId =>{
      dispatch(deleteEventSuccess(eventId));
    }).catch(error =>{
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
