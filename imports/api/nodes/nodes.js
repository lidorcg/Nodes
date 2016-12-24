// Definition of the nodes collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import Link from '../links/links';

export const Nodes = new Mongo.Collection('nodes');

const Node = Class.create({
    name: 'Node',
    collection: Nodes,
    fields: {
        title: {
            type: String
        },
        description: {
            type: String,
            default: "No description"
        },
        links: {
            type: [String], // TODO: check why Mongo.ObjectID doesn't work
            default() {
                return [];
            },
        },
        tags: {
            type: [String], // TODO: check why Mongo.ObjectID doesn't work
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

        lastUpdated: {
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
            return Node.find({
                _id: {
                    $in: this.tags
                }
            });
        },
    },
    meteorMethods: {
        create() {
            return this.save();
        },
        update(fields) {
            this.set(fields);
            this.lastUpdated = new Date();
            return this.save();
        },
        delete() {
            return this.remove();
        },
        addTag(nodeId) {
            this.tags.push(nodeId);
            this.lastUpdated = new Date();
            return this.save();
        },
        addLink(linkId) {
            this.links.push(linkId);
            this.lastUpdated = new Date();
            return this.save();
        },
    },
});

export default Node;
