import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import React from 'react';



Meteor.startup(() => {
  console.log(Meteor.call('logLeo'));
  ReactDOM.render(<div>{'leonardo'}</div>, document.getElementById('search'));
});
