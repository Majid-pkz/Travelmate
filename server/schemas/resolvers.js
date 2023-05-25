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
    
  }
};

module.exports = resolvers;
