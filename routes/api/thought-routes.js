const router = require('express').Router();

const {
    getAllThoughts,
    getThgouhtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThgouhtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .post(createReaction)
    .delete(deleteReaction);


module.exports = router