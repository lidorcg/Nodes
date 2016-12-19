// Definition of the types collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import Link from '../links/links.js';

const Types = new Mongo.Collection('types');

const Type = Class.create({
    name: 'Type',
    collection: Types,
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

export default Type;
