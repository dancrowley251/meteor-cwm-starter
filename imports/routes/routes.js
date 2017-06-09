import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import SetupAppConfig from '../ui/SetupAppConfig';
import SetupAppAdmin from '../ui/SetupAppAdmin';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const logSessionVariables = () => {
  const config = Session.get('config');
  const selectedUserId = Session.get('selectedUserId');
  console.log('Session variables: config=',config,' selectedUserId=',selectedUserId,' isNavOpen=', Session.get('isNavOpen'));
};

const onEnterSignupPage = () => {
  if (!Session.get('noUsers')) {
    console.log('routes onEnterSignupPage - there are users, redirecting home');
    browserHistory.replace('/');
  }
};

const onEnterHomePage = () => {
  console.log('routes - onEnterHomePage');
  // if (!Meteor.users.find().count()) {
  //   console.log('no users set up yet...');
  //   Session.set('appNotSetUp', true);
  //   browserHistory.replace('/setup');
  // }
};

const onEnterSetupConfigPage = () => {
  console.log('routes - onEnterSetupConfigPage');
  // check if admin
};

const onEnterSetupAdminPage = () => {
  console.log('routes - onEnterSetupConfigPage');

};

// refer to client/main.js for usage of this
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  //console.log('routes - onAuthChange: authenticated=', isAuthenticated ,' currentPagePrivacy=', currentPagePrivacy);
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';
  //logSessionVariables();
  
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    console.log('routes - onAuthChange: trying to access page that requires authentication but not currently authed - sending home');
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  console.log('routes - globalOnChange');
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
  console.log('routes - globalOnEnter: lastRoute=',lastRoute,' currentPagePrivacy=',lastRoute.privacy);
  logSessionVariables();
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} privacy="unauth" onEnter={onEnterSignupPage}/>
    <Route path="/setup-config" component={SetupAppConfig} onEnter={onEnterSetupConfigPage}/>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" onEnter={onEnterHomePage} />
      <Route path="/setup-admin" component={SetupAppAdmin} onEnter={onEnterSetupAdminPage}/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      {/*<Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>*/}
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
