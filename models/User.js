const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unqique: true,
            required: true,
            Trim: true
        },
        email: {
            type: String,
            required: true,
            unqique: true,
            match: [/.+@.+\..+/, 'You enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', UserSchema)

module.exports = User;