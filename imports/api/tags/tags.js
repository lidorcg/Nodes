// Definition of the tags collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import Link from '../links/links';

export const Tags = new Mongo.Collection('tags');

const Tag = Class.create({
    name: 'Tag',
    collection: Tags,
    fields: {
        title: {
            type: String,
        },
        description: {
            type: String,
            default: ''
        },
        links: {
            type: [Mongo.ObjectID],
            default() {
                return [];
            },
        },
        tags: {
            type: [Mongo.ObjectID],
            default() {
                return [];
            },
        },
        createdAt: {
            type: Date,
            default() {
                return new Date();
            },
        },
    },
    helpers: {
        getLinks() {
            return Link.find({
                _id: {
                    $in: this.links
                }
            });
        },
        getTags() {
            return Tag.find({
                _id: {
                    $in: this.tags
                }
            });
        },
    },
    meteorMethods: {
        commit() {
            return this.save();
        },
        addTag(tagId) {
            this.tags.push(tagId);
        },
        addLink(linkId) {
            this.links.push(linkId);
        },
    },
});

export default Tag;