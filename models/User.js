const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

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
            unqique: true
        },
        thoughts: [thouthsSchema],
        friends: [friendsSchema]
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
    return this.freinds.reduce(
        (total, freind) => total + friend.thouhts.length + 1, 0
    )
})

const User = model('User', UserSchema)

module.exports = User;