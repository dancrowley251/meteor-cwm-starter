import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const UserListHeader = (props) => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        console.log('UserListHeader - on click of New User');
        props.Session.set('selectedUserId', '');
      }}>New User</button>
    </div>
  );
};

UserListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, UserListHeader);
