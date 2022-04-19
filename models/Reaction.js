const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const moment = require('moment');

//Reaction Model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

//Moment Date
function formatDate(date) {
    formattedDate = moment(date).format('MMM Do YYY, h:mm a');
    return formattedDate;
};

module.exports = reactionSchema;