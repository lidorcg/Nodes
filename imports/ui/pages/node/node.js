import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'

import Node from '/imports/api/nodes/nodes.js';
import Link from '/imports/api/links/links.js';
import Type from '/imports/api/link-types/link-types.js';

import './node.html';

Template.Node.onCreated(function() {
  this.getNodeId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('nodes.get', this.getNodeId());
  Meteor.subscribe('nodes.all');
  Meteor.subscribe('links.all');
  Meteor.subscribe('types.all');

  Session.setDefault('editing-title', false);
  Session.setDefault('editing-description', false);
});

Template.Node.helpers({
  node() {
    const nodeId = Template.instance().getNodeId();
    return Node.findOne(nodeId);
  },
  allNodes() {
    return Node.find();
  },
  allLinkTypes() {
    return Type.find();
  },
  editingTitle() {
    return Session.get('editing-title');
  },
  editingDescription() {
    return Session.get('editing-description');
  },
});

Template.Node.events({
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
      const nodeId = instance.getNodeId();
      const node = Node.findOne(nodeId);
      const form = event.target;

      const fields = {
        title: form.title.value,
      };
      node.update(fields);
      Session.set('editing-title', false);
  },
  'submit .description-form' (event, instance) {
      event.preventDefault();
      const nodeId = instance.getNodeId();
      const node = Node.findOne(nodeId);
      const form = event.target;

      const fields = {
        description: form.description.value,
      };
      node.update(fields);
      Session.set('editing-description', false);
  },
  'submit .add-tag' (event, instance) {
      event.preventDefault();
      const node = Node.findOne(instance.getNodeId());
      const form = event.target;

      const newTag = {
        title: form.title.value,
      };

      const existNode = Node.findOne({title: newTag.title}) // TODO: better duplication checks

      if(existNode) {
        node.addTag(existNode._id);
      } else {
        const newNodeId = new Node(newTag).create();
        node.addTag(newNodeId);
      }

      form.title.value = "";
  },
  'submit .add-link' (event, instance) {
      console.log("adding new link");
      event.preventDefault();
      const node = Node.findOne(instance.getNodeId());
      const form = event.target;

      const newLink = {
        title: form.title.value,
        url: form.url.value.toLowerCase(),
        description: form.description.value || null, // TODO: remove null when validate on the model
      };

      const existLink = Link.findOne({url: newLink.url}) // TODO: better duplication checks

      if(existLink) {
        node.addLink(existLink._id);
      } else {
        const newLinkId = new Link(newLink).create();
        node.addLink(newLinkId);
      }

      form.title.value = "";
      form.url.value = "";
      form.description.value = "";
  },
});
