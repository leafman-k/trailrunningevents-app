import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action){
  switch(action.type){
    case types.LOAD_EVENTS_SUCCESS:
      return action.events;
    case types.UPDATE_EVENT_SUCCESS:
    return [
      ...state.filter(event => event.id !== action.event.id),
      Object.assign({}, action.event)
    ];
    case types.CREATE_EVENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];
    case types.DELETE_EVENT_SUCCESS:
      console.log('Event reducer eventid: ' + action.eventId);
      return [
        ...state.filter(event => event.id != action.eventId)
      ];
    default:
      return state;
  }
}
