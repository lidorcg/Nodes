// Definition of the links collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {Enum} from 'meteor/jagi:astronomy';
import Tag from '../tags/tags';

const Links = new Mongo.Collection('links');

const media = [
    'Video',
    'Audio',
    'Graphic',
    'Text',
    'Interactive',
];

const activeContent = ['Tutorial', 'Practice',];
const passiveContent = ['Academic', 'Documentation', 'Overview', 'Guide',];

const content = [
    ...activeContent,
    ...passiveContent,
];

export const LinkType = Enum.create({
    name: 'Type',
    identifiers: [
        ...media,
        ...content,
    ],
});

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
        type: {
            type: [LinkType],
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
            return Tag.find({links: this._id});
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

export default Link;
