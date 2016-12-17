import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/tag-page/tag-page.js';
import '../../ui/pages/edit-tag-page/edit-tag-page.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/tags/:_id/edit', {
  name: 'Edit.tag.page',
  action() {
    BlazeLayout.render('App_body', { main: 'Edit_tag_page' });
  },
});

FlowRouter.route('/tags/:_id', {
  name: 'Tag.page',
  action() {
    BlazeLayout.render('App_body', { main: 'Tag_page' });
  },
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
