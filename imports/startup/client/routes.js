import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/links/links.js';
import '../../ui/pages/tag/tag.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/tags/:_id', {
  name: 'Tag',
  action() {
    BlazeLayout.render('Body', { main: 'Tag' });
  },
});

FlowRouter.route('/links', {
  name: 'Links',
  action() {
    BlazeLayout.render('Body', { main: 'Links' });
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
