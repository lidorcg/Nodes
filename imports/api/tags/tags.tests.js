// Tests for the behavior of the tags collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Tag from './tags.js';

if (Meteor.isServer) {
  describe('tags collection', function () {
    it('insert correctly', function () {
      const newTag = new Tag({
        title: 'Meteor',
      });
      newTag.save(); // TODO: check why .create() doesn't work
      const added = Tag.find({ _id: newTag._id });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'tags');
      assert.equal(count, 1);
    });
  });
}
