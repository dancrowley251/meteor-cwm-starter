import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

export class SetupAppConfig extends React.Component {
  constructor(props) {
    super(props);
    let config;
    Meteor.call('config.get', (error, response) => {
      //console.log('Error', error);
      //console.log('Response', response);
      config = response;
      this.state = {
        config,
        error: ''
      };
    });
    console.log('SetupAppConfig constructor: config', config);
    this.state = {
      config: config,
      error: ''
    };
    console.log('SetupAppConfig constructor: state', this.state);
  }
  handleCompanyIdChange(e) {
    const companyId = e.target.value;
    let config = this.state.config;
    config.companyId = companyId;
    this.setState({ config });
  }
  handleApiPublicKeyChange(e) {
    const apiPublicKey = e.target.value;
    let config = this.state.config;
    config.apiPublicKey = apiPublicKey;
    this.setState({ config });
  }
  handleApiPrivateKeyChange(e) {
    const apiPrivateKey = e.target.value;
    let config = this.state.config;
    config.apiPrivateKey = apiPrivateKey;
    this.setState({ config });
  }
  handleApiUrlChange(e) {
    const apiUrl = e.target.value;
    let config = this.state.config;
    config.apiUrl = apiUrl;
    this.setState({ config });
  }
  onSubmit(e) {
    e.preventDefault();

    let companyId = this.refs.companyId.value.trim();
    let apiPublicKey = this.refs.apiPublicKey.value.trim();
    let apiPrivateKey = this.refs.apiPrivateKey.value.trim();
    let apiUrl = this.refs.apiUrl.value.trim();

    const config = {
        companyId,
        apiPublicKey,
        apiPrivateKey,
        apiUrl
    };
    
    Meteor.call('cwmanage.config.check', config, (error, response) => {
      console.log('after call config.check');
      if (error) {
        console.log('after call config.check - ERROR', error);
        this.setState({error: error.reason});
      }
      else {
        this.setState({error: ''});
        console.log(response.statusCode);
        config.verified = moment().valueOf();
        Meteor.call('config.update.setup', config, (error,response));
      }
    });

  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__setup">
          <h1>Set Up Your App</h1>
          <h2>ConnectWise Manage Rest API</h2>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="text" ref="companyId" name="companyId" placeholder="Company Id for API" value={this.state.config ? this.state.config.companyId : ''} onChange={this.handleCompanyIdChange.bind(this)}/>
            <input type="text" ref="apiPublicKey" name="apiPublicKey" placeholder="Public Key for API" value={this.state.config ? this.state.config.apiPublicKey : ''} onChange={this.handleApiPublicKeyChange.bind(this)}/>
            <input type="password" ref="apiPrivateKey" name="apiPrivateKey" placeholder="Private Key for API" value={this.state.config ? this.state.config.apiPrivateKey : ''} onChange={this.handleApiPrivateKeyChange.bind(this)}/>
            <input type="text" ref="apiUrl" name="apiUrl" placeholder="URL for API" value={this.state.config ? this.state.config.apiUrl : ''} onChange={this.handleApiUrlChange.bind(this)}/>
            <button className="button">Save and Continue</button>
          </form>

        </div>
      </div>
    );
  };
}

SetupAppConfig.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default createContainer(() => {
  // TODO Inject config into props here
  return {
    createUser: Accounts.createUser
  };
}, SetupAppConfig);
