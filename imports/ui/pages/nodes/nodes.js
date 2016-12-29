import { Template } from 'meteor/templating';

import Node from '/imports/api/nodes/nodes.js';

import '../../components/selectable/selectable.js';
import '../../components/editable-td/editable-td.js';
import '../../components/text-input/text-input.js';
import './nodes.html';

Template.Nodes.onCreated(function() {
  // subscriptions
  this.autorun(() => {
    this.subscribe('nodes.all');
  })
  // state
  this.state = new ReactiveDict();
  this.state.setDefault({
    selected: [],
  });
});

Template.Nodes.helpers({
  allNodes() {
    return Node.find();
  },
  hasSelected() {
    return Template.instance().state.get('selected').length > 0;
  },
  onSelect(item) {
    const state = Template.instance().state;
    // it seems that the template make two function-applys
    // so I wrapped the actual function with a lambda
    return (() => (isSelected) => {
      const currentSelected = state.get('selected');
      if(isSelected) {
        updatedSelected = [...currentSelected, item];
      } else {
        updatedSelected = currentSelected.filter(itm => itm._id !== item._id);
      }
      state.set('selected', updatedSelected);
    });
  },
});

Template.Nodes.events({
  'submit .new-item' (event) {
      event.preventDefault();
      const form = event.target;

      const newItem = {
        title: form.title.value,
        description: form.description.value,
      };

      const existItem = Node.findOne({title: newItem.title}) // TODO: better duplication checks

      if(existItem) {
        // TODO: alert something?
      } else {
        const newItemId = new Node(newItem).create();
      }

      form.title.value = "";
      form.description.value = "";
  },
  'submit .action' (event, instance) {
      event.preventDefault();
      const action = event.target.action.value;
      const selected = instance.state.get('selected');

      const updatedSelected = selected.filter(itm => {
        switch(action) {
          case "REMOVE":
              itm.delete();
              return false;
          default:
              return true;
        }
      });

      instance.state.set('selected', updatedSelected);
  },
});
