import { Template } from 'meteor/templating';

import Type from '/imports/api/types/types.js';

import './type-form.html';

Template.type_form.onCreated(function() {
  // subscriptions
  this.autorun(() => {
    Meteor.subscribe('types.all');
  })
});

Template.type_form.helpers({
  allTypes() {
    return Type.find();
  },
});

Template.type_form.events({
  'submit form' (event) {
    event.preventDefault();

    const existItem = Type.findOne({title: event.target.type.value})

    if(existItem) {
      this.item.addType(existItem._id);
    } else {
      // TODO: alert something?
    }

    this.doneEditing();
  },
  'blur input' () {
    this.doneEditing();
  },
});

Template.type_form.onRendered(function() {
  this.$('input').focus();
});
