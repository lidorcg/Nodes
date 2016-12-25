// Tests for the tags publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';
import Tag from '../tags.js';

describe('tags publications', function () {
  beforeEach(function () {
    Tag.remove({});
    new Tag({
      title: 'Meteor',
    }).save();
  });

  describe('tags.all', function () {
    it('sends all tags', function (done) {
      const collector = new PublicationCollector();
      collector.collect('tags.all', (collections) => {
        assert.equal(collections.tags.length, 1);
        done();
      });
    });
  });
});
