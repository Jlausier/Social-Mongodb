
const connection = require('../config/connection');
const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction")
const data = require("./data");


connection.on('error', (err) => err);

connection.once('open', async () => {
  try {
  
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'User' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }
  let reactionCheck = await connection.db.listCollections({ name: 'reaction' }).toArray();
  if (reactionCheck.length) {
    await connection.dropCollection('reaction');
  }
    const createdUsers = await User.collection.insertMany(data.users);
    console.log("Users seeded:", createdUsers);

    const createdThoughts = await Thought.collection.insertMany(data.thoughts);
    console.log("Thoughts seeded:", createdThoughts);

    const createdReactions = await Reaction.collection.insertMany(data.reactions);
    console.log("Reactions seeded:", createdReactions);
    // data.thoughts.forEach(async (thought) => {
    //   const user = createdUsers.find(u => u.username === thought.username);
    //   const createdThought = await Thought.create({ ...thought, userId: user._id });
    //   user.thoughts.push(createdThought);
    //   await user.save();
    //   console.log(`Thought ${index + 1} seeded:`, createdThought);
    // });

    
    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
  process.exit(0);
})


