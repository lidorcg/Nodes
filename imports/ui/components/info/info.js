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

        const target = event.target;
        const title = target.title.value;
        const url = target.url.value;

        let link = new Link();
        link.title = title;
        link.url = url;
        link.commit();
    },

    'submit .info-tag-add' (event) {
        event.preventDefault();

        const target = event.target;
        const title = target.title.value;

        let tag = new Tag();
        tag.title = title;
        tag.commit();
    },
});
