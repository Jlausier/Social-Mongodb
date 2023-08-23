const Thought = require('../models/Thought');
const User = require('../models/User');

// Define  controller functions here
const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching thoughts.' });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the thought.' });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ userId, thoughtText, username});
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(400).json({ message: 'Invalid thought data.' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true
      });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ message: 'Invalid thought data.' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      res.json({ message: 'Thought deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the thought.' });
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
        await Thought.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating a reaction.' });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      thought.reactions.pull({ reactionId: req.params.reactionId });
      await thought.save();
      res.json({messsage: 'Succefully deleted reaction'});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting a reaction.' });
    }
  }
};

module.exports = thoughtController;