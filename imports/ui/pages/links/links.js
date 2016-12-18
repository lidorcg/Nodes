import { Template } from 'meteor/templating';

import Link from '/imports/api/links/links.js';
import LinkType from '/imports/api/link-types/link-types.js';

import '../../components/link-entry/link-entry.js';
import './links.html';

Template.Links.onCreated(function() {
  Meteor.subscribe('links.all');
  Meteor.subscribe('link-types.all');
});

Template.Links.helpers({
  allLinks() {
    return Link.find();
  },
  allLinkTypes() {
    return LinkType.find();
  },
});
