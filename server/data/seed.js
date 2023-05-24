const db = require('../config/connection');
const { User, Trip} = require('../models');

const userData = require('./usersData');
// const tripData = require('./TripsData');


db.once('open', async () => {
  // clean database
  await User.deleteMany({});
//   await Trip.deleteMany({});
  

  // bulk create each model
  const users = await User.insertMany(userData);
//   const trips = await Trip.insertMany(tripData);
 

 

  console.log('all seeding done!');
  process.exit(0);
});
