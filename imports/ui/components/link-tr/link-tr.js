import { Template } from 'meteor/templating';

import '../editable-td/editable-td.js';

import './link-tr.html';


Template.link_tr.events({
  'click .js-remove' (event) {
    const id = this.link._id;
    this.remove(id);
  }
});
