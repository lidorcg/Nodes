// All link-types-related publications

import { Meteor } from 'meteor/meteor';
import Type from '../types.js';

Meteor.publish('types.all', function () {
  return Type.find();
});
