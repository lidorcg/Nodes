import { Template } from 'meteor/templating';

import Type from '/imports/api/types/types.js';

import '../../components/selectable/selectable.js';
import '../../components/editable/editable.js';
import './types.html';

Template.Types.onCreated(function() {
  // subscriptions
  Meteor.subscribe('types.all');
  // state
  this.state = new ReactiveDict();
  this.state.setDefault({
    selected: [],
  });
});

Template.Types.helpers({
  allTypes() {
    return Type.find();
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

Template.Types.events({
  'submit .new-item' (event) {
      event.preventDefault();
      const form = event.target;

      const newItem = {
        title: form.title.value,
        description: form.description.value,
      };

      const existItem = Type.findOne({title: newItem.title}) // TODO: better duplication checks

      if(existItem) {
        // TODO: alert something?
      } else {
        const newItemId = new Type(newItem).create();
      }

      form.title.value = "";
      form.description.value = "";
  },
  'submit .action' (event, instance) {
      event.preventDefault();
      const action = event.target.action.value;
      const selected = instance.state.get('selected');

      const updatedSelected = selected.filter(item => {
        switch(action) {
          case "REMOVE":
              item.delete();
              return false;
          default:
              return true;
        }
      });

      instance.state.set('selected', updatedSelected);
  },
});
