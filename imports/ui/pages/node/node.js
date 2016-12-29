import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Node from '/imports/api/nodes/nodes.js';
import Link from '/imports/api/links/links.js';
import Type from '/imports/api/types/types.js';

import '../../components/editable/editable.js';
import '../../components/link-tr/link-tr.js';

import './node.html';

Template.Node.onCreated(function() {
  // state from url
  this.getNodeId = () => FlowRouter.getParam('_id');
  // subscriptions
  this.autorun(() => {
    this.subscribe('nodes.get', this.getNodeId());
    this.subscribe('nodes.all');
    this.subscribe('links.all');
    this.subscribe('types.all');
  })
});

Template.Node.helpers({
  node() {
    const nodeId = Template.instance().getNodeId();
    return Node.findOne(nodeId);
  },
  allNodes() {
    return Node.find();
  },
  allLinks() {
    return Link.find();
  },
  removeLink() {
    const nodeId = Template.instance().getNodeId();
    node = Node.findOne(nodeId);
    return (id) => {
      node.removeLink(id)
    };
  },
});

Template.Node.events({
  'dblclick .title' (event, instance) {
    this.editing();
  },
  'dblclick .description' (event, instance) {
    this.editing();
  },
  'submit .js-toggle-tag' (event, instance) {
      event.preventDefault();
      const node = Node.findOne(instance.getNodeId());
      const form = event.target;

      let tagId = '';

      // get or create node on db
      const newNode = {
        title: form.title.value,
      };
      const existNode = Node.findOne({title: newNode.title}); // TODO: better duplication checks
      if(existNode) {
        tagId = existNode._id;
      } else {
        tagId = new Node(newNode).create();
      }

      // toggle tag on current node
      const isTagged = node.getTags().map(t => t._id == tagId).reduce((acc, x) => acc || x, false);
      if(isTagged) {
        node.removeTag(tagId);
      } else {
        node.addTag(tagId);
      }

      form.title.value = "";
  },
  'submit .js-add-link' (event, instance) {
      event.preventDefault();
      const node = Node.findOne(instance.getNodeId());
      const form = event.target;

      const newLink = {
        url: form.url.value.toLowerCase(),
      };

      const existLink = Link.findOne({url: newLink.url}) // TODO: better duplication checks

      if(existLink) {
        node.addLink(existLink._id);
      } else {
        const newLinkId = new Link(newLink).create();
        node.addLink(newLinkId);
      }

      form.url.value = "";
  },
});
