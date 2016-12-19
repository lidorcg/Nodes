import { Template } from 'meteor/templating';

import Tag from '/imports/api/tags/tags.js';

import '../../components/node-entry/node-entry.js';
import './nodes.html';

Template.Nodes.onCreated(function() {
  Meteor.subscribe('tags.all');
});

Template.Nodes.helpers({
  allNodes() {
    return Tag.find();
  },
});
