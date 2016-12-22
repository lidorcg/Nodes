import { Template } from 'meteor/templating';

import Node from '/imports/api/nodes/nodes.js';

import '../../components/selectable/selectable.js';
import '../../components/editable/editable.js';
import './nodes.html';

Template.Nodes.onCreated(function() {
  Meteor.subscribe('nodes.all');
  this.state = new ReactiveDict();
  this.state.setDefault({
    selected: [],
  });
});

Template.Nodes.helpers({
  allNodes() {
    return Node.find();
  },
  onSelect(id) {
    const state = Template.instance().state;
    // it seems that the template make two function-applys
    // so I wrapped the actual function with a lambda
    return (() => (isSelected) => {
      let selected = state.get('selected');
      if(isSelected) {
        selected.push(id);
      } else {
        const i = selected.indexOf(id);
        if (i > -1) {
          selected.splice(i, 1);
        }
      }
      state.set('selected', selected);
    });
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
