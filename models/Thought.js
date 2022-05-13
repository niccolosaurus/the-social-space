const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

//Thought Model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
                type: Date,
                default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
);

//reactionCount Virtual
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;