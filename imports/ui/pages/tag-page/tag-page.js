import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Tags } from '/imports/api/tags/tags.js';

import './tag-page.html';

Template.Tag_page.onCreated(function listsShowPageOnCreated() {
  this.getTagId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('tags.get', { tagId: this.getTagId() });
});

Template.Tag_page.helpers({
  tag() {
    const tagId = Template.instance().getTagId();
    return Tags.findOne(tagId);
  },
});
