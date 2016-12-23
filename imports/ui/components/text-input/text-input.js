import { Template } from 'meteor/templating';

import './text-input.html';

Template.text_input.events({
  'submit form' (event) {
    event.preventDefault();

    let fields = {};
    fields[this.name] = event.target.input.value;
    this.item.update(fields);

    this.doneEditing();
  },
  'blur input' () {
    this.doneEditing();
  },
});

Template.text_input.onRendered(function() {
  this.$('input').focus();
});
