import { Template } from 'meteor/templating';

import Link from '/imports/api/links/links.js';
import Type from '/imports/api/types/types.js';

import '../../components/editable/editable.js';
import './links.html';

Template.Links.onCreated(function() {
  Meteor.subscribe('links.all');
  Meteor.subscribe('types.all');
});

Template.Links.helpers({
  allLinks() {
    return Link.find();
  },
  allTypes() {
    return Type.find();
  },
});

Template.Links.events({
  'submit .new-link' (event) {
      event.preventDefault();
      const form = event.target;

      const newLink = {
        title: form.title.value,
        description: form.description.value,
        url: form.url.value.toLowerCase(),
      };

      const existLink = Link.findOne({url: newLink.url}) // TODO: better duplication checks

      if(existLink) {
        // TODO: alert something?
      } else {
        const newLinkId = new Link(newLink).create();
      }

      form.title.value = "";
      form.description.value = "";
      form.url.value = "";
  },
});
