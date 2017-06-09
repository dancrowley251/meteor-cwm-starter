import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // get the current configuration
  const config = Meteor.call('config.get');
  console.log('check-cwm (rename?) startup server: config',config);
});
