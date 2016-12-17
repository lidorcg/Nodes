// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';
import Link from '../links.js';

describe('links publications', function () {
  beforeEach(function () {
    Link.remove({});
    new Link({
      title: 'meteor homepage',
      url: 'https://www.meteor.com',
    }).save();
  });

  describe('links.all', function () {
    it('sends all links', function (done) {
      const collector = new PublicationCollector();
      collector.collect('links.all', (collections) => {
        assert.equal(collections.links.length, 1);
        done();
      });
    });
  });
});
