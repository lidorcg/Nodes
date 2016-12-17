import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Tag from '/imports/api/tags/tags.js';

import './edit-tag-page.html';

Template.Edit_tag_page.onCreated(function listsShowPageOnCreated() {
  this.getTagId = () => FlowRouter.getParam('_id');
  Meteor.subscribe('tags.get', this.getTagId());
  Meteor.subscribe('tags.all');
});

Template.Edit_tag_page.helpers({
  tag() {
    const tagId = Template.instance().getTagId();
    return Tag.findOne(tagId);
  },
  tags() {
    return Tag.find();
  }
});

Template.Edit_tag_page.events({
    'submit .edit-tag' (event) {
        event.preventDefault();
        const tagId = Template.instance().getTagId();
        let tag = Tag.findOne(tagId);
        const target = event.target;

        const newTagTitle = target.tag.value;
        let newTag = Tag.findOne({title: newTagTitle})

        if(newTag) {
          tag.addTag(newTag._id);
        } else {
          let newTagId = new Tag({
            title: newTagTitle,
          }).create();
          tag.addTag(newTagId);
        }

        const fields = {
          title: target.title.value,
          description: target.description.value,
        };
        tag.update(fields);

        target.tag.value = "";
    },
});
