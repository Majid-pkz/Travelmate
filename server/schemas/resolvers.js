const { Trip, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({})
    },

    // Define a resolver to retrieve individual user
    user: async (parent, args) => {
      // Use the parameter to find the matching user in the collection
      return await User.findById(args.id);
    },

    trips: async () => {
      return await  Trip.find({})
    },
    // Define a resolver to retrieve single trip
    trip: async (parent, args) => {
      // Use the parameter to find the matching trip in the collection
      return await Trip.findById(args.id);
    },
    
  },

  Mutation:{
    createUser: async(parent,{username, email, password})=>{
      return await User.create({username, email, password});

    },
    // more parameter should be added later. this is just for test 
    createTrip: async(parent,{creator, title, description, departureLocation, destination, tripType})=>{
      return await Trip.create({creator, title, description, departureLocation, destination, tripType});

    },

  }
};

module.exports = resolvers;
