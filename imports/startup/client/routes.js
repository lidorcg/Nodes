import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/search/search.js';
import '../../ui/pages/node/node.js';
import '../../ui/pages/nodes/nodes.js';
import '../../ui/pages/links/links.js';
import '../../ui/pages/types/types.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/nodes/:_id', {
  name: 'Node',
  action() {
    BlazeLayout.render('Body', { main: 'Node' });
  },
});

FlowRouter.route('/nodes', {
  name: 'Nodes',
  action() {
    BlazeLayout.render('Body', { main: 'Nodes' });
  },
});

FlowRouter.route('/links', {
  name: 'Links',
  action() {
    BlazeLayout.render('Body', { main: 'Links' });
  },
});

FlowRouter.route('/types', {
  name: 'Types',
  action() {
    BlazeLayout.render('Body', { main: 'Types' });
  },
});

FlowRouter.route('/search/:query', {
  name: 'Search',
  action() {
    BlazeLayout.render('Body', { main: 'Search' });
  },
});

FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('Body', { main: 'Home' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Body', { main: 'NotFound' });
  },
};
