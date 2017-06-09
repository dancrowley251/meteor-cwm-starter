import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import { Config } from '../imports/api/config/config';
import '../imports/startup/simple-schema-configuration.js';

/* Session variables

config
currentPagePrivacy
isNavOpen
selectedUserId
noUsers (remove?)
appNotSetUp

*/

// Config
Tracker.autorun(() => {
  // There should only be 2 times when this would be called:
  //  1. when the session variable is initially published
  //  2. whenever the configuration is updated
  // First need to subscribe to get config to client
  Meteor.subscribe('config');
  const config = Config.findOne();
  console.log('client Tracker.autorun - subscribe to config=', config);
  Session.set('config', config);
  
  // once we have a config - and this should only happen when the client is first starting
  // look to see if it is verified - if not, we need to signup and setup.
  if (config) {
    if (config.verified) {
      browserHistory.replace('/');
    }
    else {
      browserHistory.replace('/signup');
    }
  }
  
});

// Authentication changes
Tracker.autorun(() => {
  // somewhere in here we want to set isAdmin as well next level of isAuthenticated
  console.log('client Tracker.autorun - check if authenticated');
  const isAuthenticated = !!Meteor.userId();
  
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  
  // perhpas only call onAuthChange if currentPagePrivacy not undefined

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

// Nav Open changes
Tracker.autorun(() => {
  console.log('client Tracker.autorun - Session variable: isNavOpen');

  Session.set('isNavOpen', false);
});

Tracker.autorun(() => {
    const isNavOpen = Session.get('isNavOpen');

    document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  console.log('client Meteor.startup');
  const config = Config.findOne();
  console.log('client Meteor.startup after call to Config.findOne (likely undefined) config=', config);

  ReactDOM.render(routes, document.getElementById('app'));
});
