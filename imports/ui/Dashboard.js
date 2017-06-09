import React from 'react';import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import PrivateHeader from './PrivateHeader';
import UserList from './UserList';
import UserAdd from './UserAdd';
import UserUpdate from './UserUpdate';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: Session.get('selectedUserId')
    };
  }
  render() {
    const selectedUserId = Session.get('selectedUserId');
    console.log('Dashboard - render Session: selectedUserId=',selectedUserId);
    let panel = null;
    if (selectedUserId === undefined) {
      panel = <p>No user selected</p>;
    } else if (selectedUserId === '') {
      panel = <UserAdd />;
    } else {
      panel = <UserUpdate />;
    }
    
    return (
      <div>
        <PrivateHeader title="CWM API App"/>
        <div className="page-content">
          <div className="page-content__sidebar">
            <UserList />
          </div>
          <div className="page-content__main">
            {panel}
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    Session
  };
}, Dashboard);