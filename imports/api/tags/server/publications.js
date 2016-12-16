// All tags-related publications

import {Meteor} from 'meteor/meteor';
import Tag from '../tags.js';

Meteor.publish('tags.all', function() {
    return Tag.find();
});

Meteor.publish('tags.get', function(id) {
    return Tag.find(id);
});
