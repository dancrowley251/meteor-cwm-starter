import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

//export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({});
  });

  // stuff we only let happen on server
  Accounts.validateNewUser(validateNewUser);  
}

export const validateNewUser = (user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });

  return true;
};

// users insert 
Meteor.methods({
  'users.insert'(email) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    // also check to see if admin
    //Accounts.createUser();
  },
  'users.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

  },
  'users.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
    }).validate({
      _id,
      ...updates
    });
  }
});
