import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'

import Tag from '/imports/api/tags/tags.js';

import './tag.html';
import '../../components/link/link.js';

Template.Tag.onCreated(function() {
  this.getTagId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('tags.get', this.getTagId());
  Meteor.subscribe('tags.all');

  Session.setDefault('editing-title', false);
  Session.setDefault('editing-description', false);
});

Template.Tag.helpers({
  tag() {
    const tagId = Template.instance().getTagId();
    return Tag.findOne(tagId);
  },
  allTags() {
    return Tag.find();
  },
  editingTitle() {
    return Session.get('editing-title');
  },
  editingDescription() {
    return Session.get('editing-description');
  },
});

Template.Tag.events({
  'dblclick .title' (event, instance) {
    Session.set('editing-description', false);
    Session.set('editing-title', true);
  },
  'blur .title-input' (event) {
    Session.set('editing-title', false);
  },
  'dblclick .description' (event, instance) {
    Session.set('editing-title', false);
    Session.set('editing-description', true);
  },
  'blur .description-input' (event) {
    Session.set('editing-description', false);
  },
  'submit .title-form' (event, instance) {
      event.preventDefault();
      const tagId = instance.getTagId();
      let tag = Tag.findOne(tagId);
      const form = event.target;

      const fields = {
        title: form.title.value,
      };
      tag.update(fields);
      Session.set('editing-title', false);
  },
  'submit .description-form' (event, instance) {
      event.preventDefault();
      const tagId = instance.getTagId();
      let tag = Tag.findOne(tagId);
      const form = event.target;

      const fields = {
        description: form.description.value,
      };
      tag.update(fields);
      Session.set('editing-description', false);
  },
  'submit .add-tag' (event, instance) {
      event.preventDefault();
      const tagId = instance.getTagId();
      let tag = Tag.findOne(tagId);
      const form = event.target;

      const newTagTitle = form.title.value;
      let newTag = Tag.findOne({title: newTagTitle})

      if(newTag) {
        tag.addTag(newTag._id);
      } else {
        let newTagId = new Tag({
          title: newTagTitle,
        }).create();
        tag.addTag(newTagId);
      }

      form.title.value = "";
  },
});
