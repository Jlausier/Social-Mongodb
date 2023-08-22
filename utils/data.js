module.exports = {
    users: [
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: []
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: []
      }
    ],
    thoughts: [
      {
        thoughtText: 'This is a sample thought by user1',
        username: 'user1',
        reactions: []
      },
      {
        thoughtText: 'Another thought by user1',
        username: 'user1',
        reactions: []
      },
      {
        thoughtText: 'A thought by user2',
        username: 'user2',
        reactions: []
      }
    ],
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'user2'
      },
      {
        reactionBody: 'I agree.',
        username: 'user1'
      }
    ]
  };