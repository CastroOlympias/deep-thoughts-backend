const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            Unqique: true,
            Required: true,
            Trim: true
        },
        email: {
            type: String,
            Required: true,
            Unqique: true
        },
        thoughts: [thouthsSchema],
        friends: [friendsSchema]
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.freinds.reduce(
        (total, freind) => total + friend.thouhts.length + 1, 0
    )
})

const User = model('User', UserSchema)

module.exports = User;