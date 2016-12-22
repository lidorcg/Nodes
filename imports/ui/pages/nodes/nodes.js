import { Template } from 'meteor/templating';

import Node from '/imports/api/nodes/nodes.js';

import '../../components/editable/editable.js';
import './nodes.html';

Template.Nodes.onCreated(function() {
  Meteor.subscribe('nodes.all');
});

Template.Nodes.helpers({
  allNodes() {
    return Node.find();
  },
});

Template.Nodes.events({
  'submit .new-node' (event) {
      event.preventDefault();
      const form = event.target;

      const newNode = {
        title: form.title.value,
        description: form.description.value,
      };

      const existNode = Node.findOne({title: newNode.title}) // TODO: better duplication checks

      if(existNode) {
        // TODO: alert something?
      } else {
        const newNodeId = new Node(newNode).create();
      }

      form.title.value = "";
      form.description.value = "";
  },
});
