import { Template } from 'meteor/templating';

import './editable-td.html';

Template.editable_td.onCreated(function() {
  // state
  this.state = new ReactiveDict();
  this.state.setDefault({
    editing: false,
  });
});

Template.editable_td.helpers({
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

Template.editable_td.events({
  'dblclick .editable' (event, instance) {
    instance.state.set('editing', true);
  },
});
