import {Meteor} from 'meteor/meteor';

import Link from '/imports/api/links/links.js';
import Tag from '/imports/api/tags/tags.js';

import './info.html';

Template.info.onCreated(function() {
    Meteor.subscribe('links.all');
    Meteor.subscribe('tags.all');
});

Template.info.helpers({
    links() {
        return Link.find({});
    },
    tags() {
        return Tag.find({});
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

    'submit .info-tag-add' (event) {
        event.preventDefault();
        const form = event.target;
        // create tag
        const newTag = new Tag({
          title: form.title.value,
        }).create();
        // clean form
        form.title.value = "";
    },
});
