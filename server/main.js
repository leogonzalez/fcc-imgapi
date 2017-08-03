import { Meteor } from 'meteor/meteor';

import '../imports/api/queries.js';
import { Session } from 'meteor/session';


Meteor.startup(() => {
  Session.set('varA',Meteor.call(`logLeo`));
});
