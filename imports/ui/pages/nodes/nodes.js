import { Template } from 'meteor/templating';

import Node from '/imports/api/nodes/nodes.js';

import '../../components/node-entry/node-entry.js';
import './nodes.html';

Template.Nodes.onCreated(function() {
  Meteor.subscribe('ndoes.all');
});

Template.Nodes.helpers({
  allNodes() {
    return Node.find();
  },
});
