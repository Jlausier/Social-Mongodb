const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


// Set up body parser and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});