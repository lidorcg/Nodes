// Methods related to tags

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tags } from './tags.js';

Meteor.methods({
  'tags.insert'(title) {
    check(title, String);

    return Tags.insert({
      title,
      createdAt: new Date(),
    });
  },
});
