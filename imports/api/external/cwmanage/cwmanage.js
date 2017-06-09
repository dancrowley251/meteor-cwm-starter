import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import btoa from 'btoa';

// Assumes only GETs
const apiCall = (apiCallParams, callback) => {
  console.log('Config: apiCall begin');
  try {
      const response = HTTP.get(apiCallParams.url, apiCallParams.options);
      console.log('Config: apiCall after HTTP.get - no error: statusCode: ',response.statusCode);
      callback(null, response);
  } catch (error) {
      console.log('Config: apiCall caught error');
      let errorCode;
      let errorMessage;
      if (error.response) {
        console.log('Config: apiCall caught error with response', error.response.statusCode);
        if (error.response.data) {
          errorCode = error.response.data.code;
          errorMessage = error.response.data.message;
        }
        else {
          console.log(error.response);
          errorCode = 501;
          errorCode = 'No data object on error.response';
        }
      }
      else {
        console.log('Config: apiCall caught error without response');
        errorCode = 500;
        errorMessage = 'Cannot access the API';
      }
      const apiError = new Meteor.Error(errorCode, errorMessage);
      console.log('Config: apiCall caught error - now calling callback');
      callback(apiError, null);
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'cwmanage.config.check'( config ) {
      
      console.log('config.check');
      const authRaw = `${ config.companyId }+${ config.apiPublicKey }:${ config.apiPrivateKey }`;
      const auth = `Basic ${ btoa(authRaw) }`;
      console.log(authRaw, auth);
      const apiCallParams = {
        url: config.apiUrl + '/company/companies?conditions=name="config.companyId"',
        options: {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': auth
          }
        }
     };
     this.unblock();
     const response = Meteor.wrapAsync(apiCall)(apiCallParams);
     console.log('config.check - after wrapAsync');
     return response;
    },
  });
}