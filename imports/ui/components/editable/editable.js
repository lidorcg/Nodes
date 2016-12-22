import { Template } from 'meteor/templating';

import './editable.html';

Template.editable.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    editing: false,
  });
});

Template.editable.helpers({
  editing() {
    return Template.instance().state.get('editing');
  },
  onDoneEditing () {
    const state = Template.instance().state
    return () => {
      state.set('editing', false);
    };
  }
});

Template.editable.events({
  'dblclick .editable' (event, instance) {
    instance.state.set('editing', true);
  },
});

Template.editable_form.events({
  'submit form' (event) {
    event.preventDefault();
    data = Template.currentData();
    let fields = {};
    fields[data.name] = event.target.input.value;
    data.item.update(fields);
    this.doneEditing();
  },
  'blur input' () {
    this.doneEditing();
  },
});

Template.editable_form.onRendered(function() {
  Template.instance().$('input').focus();
});
