import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import MyEventsPage from './components/myevents/MyEventsPage';
import EventsPage from './components/event/EventsPage';
import AboutPage from './components/about/AboutPage';
import NotFound from './components/common/NotFound';
import RegistrationPage from './components/registration/RegistrationPage';
import SignInPage from './components/user/SignInPage';
import SignOutPage from './components/user/SignOutPage';
import ManageEventPage from './components/event/ManageEventPage';
import toastr from 'toastr';

export const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
      // Now you can access the store object here.
      const state = store.getState();

      if (!state.isAuthenticated) {
        replace({ pathname: '/signin',
           state: { nextPathname: nextState.location.pathname }
        });
      }
    };
  const adminAuthRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.isAuthenticated || state.user.role !=='ADMIN') {
      toastr.warning('Route to aimed path requires authentication and role authorization!!!');
      replace({ pathname: '/signin',
         state: { nextPathname: nextState.location.pathname }
      });
    }
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="home" component={HomePage}/>
      <Route path="registration/:id" component={RegistrationPage} onEnter={authRequired}/>
      <Route path="events" component={EventsPage} onEnter={adminAuthRequired}/>
      <Route path="myevents" component={MyEventsPage} onEnter={authRequired}/>
      <Route path="event" component={ManageEventPage} onEnter={adminAuthRequired}/>
      <Route path="event/:id" component={ManageEventPage} onEnter={adminAuthRequired}/>
      <Route path="about" component={AboutPage}/>
      <Route path="signin" component={SignInPage}/>
      <Route path="signout" component={SignOutPage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
};
