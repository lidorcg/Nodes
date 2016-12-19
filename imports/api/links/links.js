// Definition of the links collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {Enum} from 'meteor/jagi:astronomy';
import Node from '../nodes/nodes.js';
import Type from '../types/types.js';

const Links = new Mongo.Collection('links');

const Link = Class.create({
    name: 'Link',
    collection: Links,
    fields: {
        title: {
            type: String
        },
        description: {
            type: String,
            default: "No description",
        },
        url: {
            type: String
        },
        types: {
            type: [String],
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
        getTags() {
            return Node.find({links: this._id});
        },
        getTypes() {
          return Type.find({
              _id: {
                  $in: this.types
              }
          })
        }
    },
    meteorMethods: {
        create() {
            return this.save();
        },
        update(fields) {
            this.set(fields);
            return this.save();
        },
        delete() {
            return this.remove();
        },
        addType(typeId) {
            this.types.push(typeId);
            return this.save();
        },
    },
});

export default Link;
