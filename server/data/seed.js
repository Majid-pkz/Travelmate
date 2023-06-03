const db = require('../config/connection');
const { User, Trip, Profile} = require('../models');

const userData = require('./usersData');
 const tripData = require('./TripsData');
 const profileData = require('./profileData');


db.once('open', async () => {
  // clean database
  await User.deleteMany({});
 await Trip.deleteMany({});
  await Profile.deleteMany({});
  

  // bulk create each model
  const users = await User.insertMany(userData);
  const trips = await Trip.insertMany(tripData);
  const profiles = await Profile.insertMany(profileData);
 

 

  console.log('all seeding done!');
  process.exit(0);
});
