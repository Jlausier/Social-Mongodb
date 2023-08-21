const Thought = require('../models/Thought');

// Define  controller functions here
const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await User.create({ username, email });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  }