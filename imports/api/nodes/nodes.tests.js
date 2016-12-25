// Tests for the behavior of the tags collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Node from './nodes.js';

if (Meteor.isServer) {
  describe('nodes collection', function () {
    it('insert correctly', function () {
      const newNode = new Node({
        title: 'Meteor',
      });
      newNode.save(); // TODO: check why .create() doesn't work
      const added = Node.find({ _id: newNode._id });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'tags');
      assert.equal(count, 1);
    });
  });
}
