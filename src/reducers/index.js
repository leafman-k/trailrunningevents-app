import {combineReducers} from 'redux';
import events from './eventReducer';
import registration from './registrationReducer';
import sigIn from './signInReducer';
import ajaxCallInProgress from './ajaxStatusReducer';
import authentication from './authenticationReducer';

const rootReducer = combineReducers({
  events: events,
  myEvents: registration,
  ajaxCallsInProgress: ajaxCallInProgress,
  user: sigIn,
  isAuthenticated: authentication
});

export default rootReducer;
