const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            Required: true,
            maxLength: 280
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal = dateFormat(createdAtVal)
        }
    },
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [reactionSchema]
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length(
        (total, thought) => total + thought.reactions.length + 1, 0
    );
});

const Thought = model('Thought', ThoughtSchema)