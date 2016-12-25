import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Node from '/imports/api/nodes/nodes.js';

import './search.html';

Template.Search.onCreated(function() {
  // state from url
  this.getQuery = () => FlowRouter.getParam('query');
  // subscriptions
  this.autorun(() => {
    this.subscribe('nodes.search', this.getQuery());
  });
});

Template.Search.helpers({
  results() {
    const query = Template.instance().getQuery();
    return Node.find({});
  },
});
