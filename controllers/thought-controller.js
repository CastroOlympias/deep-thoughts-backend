const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    getThoughtByid({ params }< res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbUserData))
        .catch(err => {
            consol.log(err);
            res.sendStatus(400);
        });
    },

    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found by that id!' });
            }
        }) 
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbuserData))
        .catch(err => res.json(err));
    }
}