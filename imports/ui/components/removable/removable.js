import { Template } from 'meteor/templating';

import './removable.html';

Template.removable.events({
  'dblclick .remove' (event, instance) {
    data = Template.currentData();
    data.item.delete();
  },
});
