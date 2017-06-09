import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check email and password'});
      }
      else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    const config = this.props.Session.get('config');
    console.log('Login render - config=',config);
    if (config) {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>
  
            {this.state.error ? <p>{this.state.error}</p> : undefined}
  
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>
  
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <p>Loading, please wait</p>
          </div>
        </div>
      )
    }
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  // added to onto props
  return {
    loginWithPassword: Meteor.loginWithPassword,
    Session
  };
}, Login);
