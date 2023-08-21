const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 27017;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set up body parser and routes
app.use(express.json());
app.use('/api/users', require('./api/users'));
app.use('/api/thoughts', require('./api/thoughts'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});