import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const UserListItem = (props) => {
  const className = props.user.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      console.log('UserListItem - onClick');
      props.Session.set('selectedUserId', props.user._id);
    }}>
      <h5 className="item__title">{ props.user.title || 'Untitled user' }</h5>
      <p className="item__subtitle">{ props.user.emails[0].address }</p>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(({ user }) => {
  console.log('UserListItem - createContainer: user=',user);
  return { 
    Session
  };
}, UserListItem);
