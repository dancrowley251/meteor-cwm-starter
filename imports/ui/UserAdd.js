import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export class UserAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  onSearchClick(e) {
    console.log('UserAdd - search button clicked.');
  }
  render() {
  return (
    <div className="editor">
      <input placeholder="First Name" />
      <input placeholder="Last Name" ></input>
      <div>
        <button className="button button--secondary" onClick={this.onSearchClick.bind(this)}>Search</button>
      </div>
    </div>
  )
}
};

UserAdd.propTypes = {
  call: PropTypes.func.isRequired
}

export default createContainer(() => {

  return {
    call: Meteor.call
  };
}, UserAdd);
