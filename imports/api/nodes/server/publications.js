// All tags-related publications

import {Meteor} from 'meteor/meteor';
import Node from '../nodes.js';

Meteor.publish('nodes.all', function() {
    return Node.find();
});

Meteor.publish('nodes.search', function(query) {
    return Node.find({
        $or: [
            {
                'title': {
                    '$regex': query,
                    $options: 'i'
                }
            }, {
                'description': {
                    '$regex': query,
                    $options: 'i'
                }
            },
        ]
    });
});

Meteor.publish('nodes.get', function(id) {
    return Node.find(id);
});
