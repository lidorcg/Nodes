import { Meteor } from 'meteor/meteor';

import { Links } from '/imports/api/links/links.js';
import { Tags } from '/imports/api/tags/tags.js';

import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('links.all');
  Meteor.subscribe('tags.all');
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
  tags() {
    return Tags.find({});
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;

    Meteor.call('links.insert', title.value, url.value, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
      }
    });
  },

  'submit .info-tag-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;

    Meteor.call('tags.insert', title.value, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
      }
    });
  },
});
