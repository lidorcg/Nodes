// All links-related publications

import { Meteor } from 'meteor/meteor';
import LinkType from '../link-types.js';

Meteor.publish('link-types.all', function () {
  return LinkType.find();
});
