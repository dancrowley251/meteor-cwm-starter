import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import UserListHeader from './UserListHeader';
import UserListItem from './UserListItem';
//import NoteListEmptyItem from './NoteListEmptyItem';

export const UserList = (props) => {
  return (
    <div className="item-list">
      <UserListHeader />
      { /*!props.users.length ? <NoteListEmptyItem /> : undefined */}
      { props.users.map((user) => {
        return <UserListItem key={user._id} user={user}/>;
      }) }
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedUserId = Session.get('selectedUserId');

  Meteor.subscribe('users');

  return {
    users: Meteor.users.find({}).fetch().map((user) => {
      return {
        ...user,
        selected: selectedUserId === user._id
      };
    })
  };
}, UserList);
