// All tags-related publications

import {Meteor} from 'meteor/meteor';
import {Tags} from '../tags.js';

Meteor.publish('tags.all', function() {
    return Tags.find();
});

Meteor.publish('tags.get', function(params) {
    const {tagId} = params;

    return Tags.find(tagId);
});
