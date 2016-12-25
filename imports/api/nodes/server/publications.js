// All tags-related publications

import {Meteor} from 'meteor/meteor';
import Node from '../nodes.js';

Meteor.publish('nodes.all', function() {
    return Node.find();
});

Meteor.publish('nodes.get', function(id) {
    return Node.find(id);
});
