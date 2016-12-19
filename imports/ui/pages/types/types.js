import { Template } from 'meteor/templating';

import Type from '/imports/api/types/types.js';

import '../../components/type-entry/type-entry.js';
import './types.html';

Template.Types.onCreated(function() {
  Meteor.subscribe('types.all');
});

Template.Types.helpers({
  allTypes() {
    return Type.find();
  },
});

Template.Types.events({
  'submit .new-type' (event) {
      event.preventDefault();
      const form = event.target;

      const newType = {
        title: form.title.value,
        description: form.description.value,
      };

      const existType = Type.findOne({title: newType.title}) // TODO: better duplication checks

      if(existType) {
        // TODO: alert something?
      } else {
        const newTypeId = new Type(newType).create();
      }

      form.title.value = "";
      form.description.value = "";
  },
});
