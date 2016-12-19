import {Meteor} from 'meteor/meteor';

import Link from '/imports/api/links/links.js';
import Node from '/imports/api/nodes/nodes.js';

import './info.html';

Template.info.onCreated(function() {
    Meteor.subscribe('links.all');
    Meteor.subscribe('nodes.all');
});

Template.info.helpers({
    links() {
        return Link.find({});
    },
    nodes() {
        return Node.find({});
    },
});

Template.info.events({
    'submit .info-link-add' (event) {
        event.preventDefault();
        const form = event.target;
        // create link
        let link = new Link({
          title: form.title.value,
          url: form.url.value,
        }).create();
        // clean form
        form.title.value = "";
        form.url.value = "";
    },

    'submit .info-node-add' (event) {
        event.preventDefault();
        const form = event.target;
        // create node
        const newNode = new Node({
          title: form.title.value,
        }).create();
        // clean form
        form.title.value = "";
    },
});
