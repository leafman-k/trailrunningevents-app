import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registrationReducer(state = initialState.myEvents, action){
  switch(action.type){
    case types.REGISTER_TO_EVENT_SUCCESS:
      return [...state,
        Object.assign({}, action.registration)
      ];
      case types.CANCEL_REGISTRATION_SUCCESS:
        return [
           ...state.filter(event => event.eventId !== action.eventId)
        ];
    default:
      return state;
  }
}
