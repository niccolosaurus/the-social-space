const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
// const validator = require('validator');
// Could not get the validators to work

//User Model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: {
            //     validator: () => Promise.resolve(false),
            //     message: 'Email validation failed'
            // },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJson: {
            getters: true,
            virtuals: true,
        },
    }
);

//friendCount Virtual
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;