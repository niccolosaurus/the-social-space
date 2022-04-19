const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = reaction('./Reaction');
const moment = require('moment');

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
                default: Date.now(),
                get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    },
);

//reactionCount Virtual
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//Moment Date
function formatDate(date) {
    formattedDate = moment(date).format('MMM Do YYY, h:mm a');
    return formattedDate;
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;