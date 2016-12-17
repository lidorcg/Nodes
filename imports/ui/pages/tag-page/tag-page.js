import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Tag from '/imports/api/tags/tags.js';

import './tag-page.html';
import '../../components/link/link.js';

Template.Tag_page.onCreated(function listsShowPageOnCreated() {
  this.getTagId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('tags.get', this.getTagId());
  Meteor.subscribe('tags.all');
});

Template.Tag_page.helpers({
  tag() {
    const tagId = Template.instance().getTagId();
    return Tag.findOne(tagId);
  },
});
