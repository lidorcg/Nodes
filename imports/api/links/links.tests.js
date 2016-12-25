// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Link from './links.js';

if (Meteor.isServer) {
  describe('links collection', function () {
    it('insert correctly', function () {
      const newLink = new Link({
        title: 'meteor homepage',
        url: 'https://www.meteor.com',
      });
      newLink.save();
      const added = Link.find({ _id: newLink._id });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'links');
      assert.equal(count, 1);
    });
  });
}
