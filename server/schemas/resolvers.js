const { Trip, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },

    trips: async () => {
      return Trip.find({});
    },
    
  }
};

module.exports = resolvers;
