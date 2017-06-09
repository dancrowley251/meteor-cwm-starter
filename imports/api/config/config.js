import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Config = new Mongo.Collection('config');

if (Meteor.isServer) {
  console.log('api>config Meteor.isServer');
  let config = Config.findOne();
  // if no config yet, create one
  if (!config) {
    console.log('api>config Meteor.isServer - no config yet - creating');
    // set up an empty one
    Config.insert({
      companyId: '',
      apiPublicKey: '',
      apiPrivateKey: '',
      apiUrl: '',
      userId: this.userId,
      updatedAt: moment().valueOf(),
      verified: ''
    });
  }
  Meteor.publish('config', function() {
    return Config.find({}, { fields: {apiPrivateKey: 0} });
  });
}

Meteor.methods({
  'config.get'() {
    // consider caching
    // also wipe out private key if not admin
    // okay - this is easier to call than the import of config
    console.log('api>config.get - probably should not use this - use subscription');
    let config = Config.findOne({}, { fields: {apiPrivateKey: 0} });
    if (!config) {
      config.log('api>config.get - no config yet - creating');
      // set up an empty one
      Config.insert({
        companyId: '',
        apiPublicKey: '',
        apiPrivateKey: '',
        apiUrl: '',
        userId: this.userId,
        updatedAt: moment().valueOf(),
        verified: ''
      });
      config = Config.findOne({}, { fields: {apiPrivateKey: 0} });
    }
    console.log('config config.get returning config=', config);
    return config;
  },
  'config.update.setup'(config) {
    console.log('config.update.setup: config - ',config);

    new SimpleSchema({
      companyId: {
        type: String,
        min: 1
      },
      apiPublicKey: {
        type: String,
        min: 1
      },
      apiPrivateKey: {
        type: String,
        min: 1
      },
      apiUrl: {
        type: String,
        min: 1
      },
      verified: {
        type: Number
      }
    }).validate(config);

    Config.update({
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...config
      }
    });
  }
});