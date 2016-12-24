import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'

import Node from '/imports/api/nodes/nodes.js';
import Link from '/imports/api/links/links.js';
import Type from '/imports/api/types/types.js';

import '../../components/editable/editable.js';

import './node.html';

Template.Node.onCreated(function() {
  this.getNodeId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('nodes.get', this.getNodeId());
  Meteor.subscribe('nodes.all');
  Meteor.subscribe('links.all');
  Meteor.subscribe('types.all');
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
});

Template.Node.events({
  'dblclick .title' (event, instance) {
    this.editing();
  },
  'blur .title-input' (event) {
    this.doneEditing();
  },
  'dblclick .description' (event, instance) {
    this.editing();
  },
  'blur .description-input' (event) {
    this.doneEditing();
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
        description: form.description.value,
        url: form.url.value.toLowerCase(),
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
