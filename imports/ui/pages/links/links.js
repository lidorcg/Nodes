import { Template } from 'meteor/templating';

import Link from '/imports/api/links/links.js';
import Type from '/imports/api/types/types.js';

import '../../components/selectable/selectable.js';
import '../../components/editable/editable.js';
import '../../components/text-input/text-input.js';
import './links.html';

Template.Links.onCreated(function() {
  // subscriptions
  Meteor.subscribe('links.all');
  Meteor.subscribe('types.all');
  // state
  this.state = new ReactiveDict();
  this.state.setDefault({
    selected: [],
  });
});

Template.Links.helpers({
  allLinks() {
    return Link.find();
  },
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

Template.Links.events({
  'submit .new-item' (event) {
      event.preventDefault();
      const form = event.target;

      const newItem = {
        title: form.title.value,
        description: form.description.value,
        url: form.url.value.toLowerCase(),
      };

      const existItem = Link.findOne({url: newItem.url}) // TODO: better duplication checks

      if(existItem) {
        // TODO: alert something?
      } else {
        const newItemId = new Link(newItem).create();
      }

      form.title.value = "";
      form.description.value = "";
      form.url.value = "";
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
