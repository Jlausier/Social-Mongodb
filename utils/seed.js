const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");
const data = require("./data");

mongoose.connect("mongodb://localhost/social-netwrok", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
// const users = [
//   {
//     username: 'user1',
//     email: 'user1@example.com'
//   },
//   {
//     username: 'user2',
//     email: 'user2@example.com'
//   }
// ];

// Sample thought data
// const thoughts = [
//   {
//     thoughtText: 'This is a sample thought by user1',
//     username: 'user1'
//   },
//   {
//     thoughtText: 'Another thought by user1',
//     username: 'user1'
//   },
//   {
//     thoughtText: 'A thought by user2',
//     username: 'user2'
//   }
// ];

async function seedDatabase() {
  try {
    // await User.deleteMany();
    // await Thought.deleteMany();

    const createdUsers = await User.insertMany(data.users);
    console.log("Users seeded:", createdUsers);

    // data.thoughts.forEach(async (thought) => {
    //   const user = createdUsers.find(u => u.username === thought.username);
    //   const createdThought = await Thought.create({ ...thought, userId: user._id });
    //   user.thoughts.push(createdThought);
    //   await user.save();
    //   console.log(`Thought ${index + 1} seeded:`, createdThought);
    // });

    mongoose.connection.close();
    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
mongoose.connection.once('open', () => {
seedDatabase()});
