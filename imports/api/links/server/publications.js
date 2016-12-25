// All links-related publications

import { Meteor } from 'meteor/meteor';
import Link from '../links.js';

Meteor.publish('links.all', function () {
  return Link.find();
});
