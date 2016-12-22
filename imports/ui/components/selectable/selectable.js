import { Template } from 'meteor/templating';

import './selectable.html';

Template.selectable.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    selected: false,
  });
});

Template.selectable.helpers({
  isSelected() {
    return Template.instance().state.get('selected') ? "selected" : "";
  },
});

Template.selectable.events({
  'click .selectable' (event, instance) {
    const isSelected = !instance.state.get('selected');
    instance.state.set('selected', isSelected);
    this.onSelect(isSelected);
  },
});
