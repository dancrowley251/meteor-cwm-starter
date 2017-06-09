import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export class UserUpdate extends React.Component {
  render () {
    console.log('update user');
    return (
      <div>
        <p>Update user {this.props.user.emails[0].address} here</p>
      </div>
    );
  }
}

UserUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectUserId = Session.get('selectedUserId');
  console.log('UserUpdate createContainer: selectedUserId=', selectUserId);
  const user = Meteor.users.findOne({ _id: selectUserId });
  //console.log('PropTypes ISSUE! UserUpdate createContainer user=', user);
  return {
    user,
    Session
  };
}, UserUpdate);
