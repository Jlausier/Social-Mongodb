const express = require('express');
const router = express.Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../thought-controller');

router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;