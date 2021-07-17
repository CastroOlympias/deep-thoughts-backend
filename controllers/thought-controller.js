const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found by that id!' });
                return
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found by that id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: {reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;