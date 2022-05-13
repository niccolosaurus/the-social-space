// const connection = require('../config/connection');
// const { User, Thought } = require('../models');
// const { getRandomName } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected');

//     //Drop existing users
//     await User.deleteMany({});

//     //Drop existing thoughts
//     await Thought.deleteMany({});

//     //Array that holds the users
//     const users = [];

//     //Loops 20 times -- gets us usernames and emails
//     for (let i =0; i < 20; i++) {
//         const username = getRandomName();
//         const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@email.com`;

//         users.push({
//             username,
//             email,
//         });
//     }

//     //Add users to the collection and await the results
//     await User.collection.insertMany(users);

//     //Logout the seed data to indicate what should appear in the database
//     console.table(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
// });