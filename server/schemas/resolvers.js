const { Trip, User, TripType, Profile } = require("../models");
// const {AuthenticationError} = require('apollo-server-express')
const {ApolloError} = require('apollo-server-express')
const resolvers = {
  Query: {
    users:  async () => {
      const users = await User.find({});      
      return users;
    }, 

    // Define a resolver to retrieve individual user
    user: async (parent, args) => {
      // Use the parameter to find the matching user in the collection
     let user = await User.findById(args.id);
    
     if(!user){
      throw new ApolloError ('user does not exist')

     }
     return user

      // return User.findById(args.id).populate('createdTrips');
    },
    
    
   trips: async () => {
      const trips = await Trip.find({}).populate('creator').populate('tripType').populate('travelmates');     
      return trips;
    },


    // Define a resolver to retrieve single trip
    trip: async (parent, args) => {
      // Use the parameter to find the matching trip in the collection
      return await Trip.findById(args.id).populate("creator").populate('tripType').populate('travelmates');
    },

    tripTypes: async () => {
      return await TripType.find({});
    },
    tripType: async (parent, args) => {
      // Use the parameter to find the matching tripType in the collection
      return await TripType.findById(args.id);
    },

    profiles: async () => {
      return await Profile.find({}).populate('profileUser').populate('createdTrips');
    },

    // Define a resolver to retrieve single profile
    profile: async (parent, args) => {
      // Use the parameter to find the matching profile in the collection
      return await Profile.findById(args.id).populate('profileUser').populate('createdTrips');
    }

  },

  Mutation: {
    //destructure
    createUser: async (parent, { firstname, lastname, email, password }) => {
      return await User.create({ firstname, lastname, email, password });
    },

    updateUser: async (parent, { id }) => {
      // Find and update
      return await User.findOneAndUpdate(
        { _id: id },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },

    // deleteUser: async (parent, { id }) => {
    //   return await User.findOneAndDelete({ _id: id });
    // },

    //   could be destructure later. this is just for test --- note: destructure did not work for me. find out why?
    createTrip: async (parent, params) => {
      //  const {creator, title, description, departureLocation, destination, tripType} = params

      // this await await does not seems to be correct but working  needs review

      let trip = await  Trip.create(params);
     
     await User.findOneAndUpdate(
        { _id: params.creator },
        { $addToSet: { createdTrips: trip._id } },
        {new:true}
      );
      trip =  await trip.populate('creator tripType')
      return trip;
    },

    removeTrip: async (parent, { id }) => {
      return Trip.findOneAndDelete({ _id: id });
    },

    joinTrip: async (parent, { id, userJoining }) => {
   
    let userData= await  Trip.findOneAndUpdate(
      { _id: id },
      { $addToSet: { travelmates: userJoining } },
      {new:true}); 
      userData = await userData.populate('creator travelmates tripType')   
 
      return  userData
    },
    

    createTripType: async (parent, tripType) => {
      return await TripType.create(tripType);
    },

    createProfile: async(parent, params)=>{
      return await Profile.create(params);
    },

    updateProfile:async (parent, {id}) => {
      return await Profile.findOneAndUpdate(
        { _id: id },
        { new: true }
      );
    },

    deleteProfile: async (parent, { id }) => {
      return await Profile.findOneAndDelete({ _id: id });
    }

  },
};


module.exports = resolvers;
