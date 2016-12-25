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
  },
  onEditing () {
    const state = Template.instance().state
    return () => {
      state.set('editing', true);
    };
  }
});
