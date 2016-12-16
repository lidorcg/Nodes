// Definition of the links collection

import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {Enum} from 'meteor/jagi:astronomy';
import Tag from '../tags/tags';

export const Links = new Mongo.Collection('links');

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

const Type = Enum.create({
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
            type: String,
        },
        description: {
            type: String,
            default: '',
        },
        url: {
            type: String,
        },
        type: {
            type: [Type],
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
        }
    },
    meteorMethods: {
        commit() {
            return this.save();
        }
    },
});

export default Link;
