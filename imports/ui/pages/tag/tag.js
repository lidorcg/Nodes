import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'

import Tag from '/imports/api/tags/tags.js';
import Link from '/imports/api/links/links.js';
import LinkType from '/imports/api/link-types/link-types.js';

import './tag.html';

Template.Tag.onCreated(function() {
  this.getTagId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('tags.get', this.getTagId());
  Meteor.subscribe('tags.all');
  Meteor.subscribe('links.all');
  Meteor.subscribe('link-types.all');

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
  allLinkTypes() {
    return LinkType.find();
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
      const tag = Tag.findOne(instance.getTagId());
      const form = event.target;

      const newTag = {
        title: form.title.value,
      };

      const existTag = Tag.findOne({title: newTag.title}) // TODO: better duplication checks

      if(existTag) {
        tag.addTag(existTag._id);
      } else {
        const newTagId = new Tag(newTag).create();
        tag.addTag(newTagId);
      }

      form.title.value = "";
  },
  'submit .add-link' (event, instance) {
      console.log("adding new link");
      event.preventDefault();
      const tag = Tag.findOne(instance.getTagId());
      const form = event.target;

      const newLink = {
        title: form.title.value,
        url: form.url.value.toLowerCase(),
        description: form.description.value || null, // TODO: remove null when validate on the model
      };

      const existLink = Link.findOne({url: newLink.url}) // TODO: better duplication checks

      if(existLink) {
        tag.addLink(existLink._id);
      } else {
        const newLinkId = new Link(newLink).create();
        tag.addLink(newTagId);
      }

      form.title.value = "";
      form.url.value = "";
      form.description.value = "";
  },
});
