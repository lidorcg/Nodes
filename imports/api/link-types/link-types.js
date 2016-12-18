// Definition of the links collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import Link from '../links/links.js';

const LinkTypes = new Mongo.Collection('link-types');

const LinkType = Class.create({
    name: 'LinkType',
    collection: LinkTypes,
    fields: {
        title: {
            type: String
        },
        description: {
            type: String,
            default: "",
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
            return Link.find({type: this._id});
        },
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
    },
});

export default LinkType;
