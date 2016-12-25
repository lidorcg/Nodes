import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './nav.html';


Template.Nav.events({
  'submit .js-search' (event) {
    event.preventDefault();
    const query = event.target.query.value;
    FlowRouter.go('Search', { query: query });
  }
});
