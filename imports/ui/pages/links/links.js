import { Template } from 'meteor/templating';

import Link from '/imports/api/links/links.js';
import Type from '/imports/api/types/types.js';

import '../../components/link-entry/link-entry.js';
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
