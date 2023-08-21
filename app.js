const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set up body parser and routes
app.use(express.json());
app.use('/api/users', require('./controller/api/users'));
app.use('/api/thoughts', require('./controller/api/thoughts'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});