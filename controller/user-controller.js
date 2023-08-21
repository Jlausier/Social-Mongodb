const User = require('../models/User');

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
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      // Remove associated thoughts
      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found.' });
      }
      user.friends.push(friend);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while adding a friend.' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while removing a friend.' });
    }
  }
};

module.exports = userController;