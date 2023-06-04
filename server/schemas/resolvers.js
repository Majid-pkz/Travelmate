const { Trip, User, TripType, Profile, Interest } = require("../models");
// const {AuthenticationError} = require('apollo-server-express')
const {ApolloError} = require('apollo-server-express')
const resolvers = {
  Query: {
    users:  async () => {
      const users = await User.find({})     
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
    },

    profiles:  async () => {
      const profiles = await Profile.find({}).populate('profileUser').populate('interests').
      populate('createdTrips');     
      return profiles;
    }, 

    profile: async (parent, args) => {
      // Use the parameter to find the matching user in the collection
     let profile = await Profile.findById(args.id).populate('profileUser').populate('interest').
     populate('createdTrips');
    
     if(!profile){
      throw new ApolloError ('profile does not exist')

     }
     return profile     
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
    interests:  async () => {
      const inter = await Interest.find({})     
      return inter;
    }, 

  
    interest: async (parent, args) => {
     
     let inter = await Interest.findById(args.id);
    
     if(!inter){
      throw new ApolloError ('user does not exist')

     }
     return inter     
    },


  },

  Mutation: {
    //destructure
    createUser: async (parent, {  firstname, lastname, email, password, isAdmin }) => {
      return await User.create({ firstname, lastname, email, password,isAdmin });
    },

    createProfile: async(parent,params)=>{
      return (await Profile.create(params)).populate('profileUser interests')

    },
    createTripType: async (parent, tripType) => {
      return await TripType.create(tripType);
    },

    createInterests: async (parent, interests) => {
      return await Interest.create(interests);
    },

    createTrip: async (parent, params) => {
      //  const {creator, title, description, departureLocation, destination, tripType} = params

      // this await await does not seems to be correct but working  needs review

      let trip = await  Trip.create(params);
     
     await Profile.findOneAndUpdate(
        { _id: params.creator },
        { $addToSet: { createdTrips: trip._id } },
        {new:true}
      );
      // trip =  await Trip.findById(trip._id).populate('creator').populate('tripType')
      trip =  await trip.populate('creator tripType travelmates')
      return trip;
    },



    updateUser: async (parent, { id, firstname, lastname, email, password }) => {
      // Find and update
      return await User.findOneAndUpdate(
        { _id: id },
        { firstname, lastname, email, password },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    // note the following version looks the same as above in studio gql but does not update.. why??
    // maybe params.id not params._id

    // updateUser: async (parent, params) => {
    //   // Find and update
    //   return await User.findOneAndUpdate(
    //     { _id: params._id },
    //     params,
    //     // Return the newly updated object instead of the original
    //     { new: true }
    //   );
    // },
    
    // updateProfile: async (parent, { id, location, gender,age, bio,
    //   interests,image,verified,subscribed}) => {
    //   // Find and update
    //   return await Profile.findOneAndUpdate(
    //     { _id: id },
    //     {location, gender,age, bio,
    //       interests,image,verified,subscribed },
    //     // Return the newly updated object instead of the original
    //     { new: true }
    //   );
    // },
 

    updateProfile:async (parent, params) => {
  
      console.log(params.id)
      return await Profile.findOneAndUpdate(
        { _id: params.id },
        params,
        { new: true }
      ).populate('profileUser interests createdTrips');
    },





        removeTrip: async (parent, { id }) => {

      return await Trip.findOneAndDelete({ _id: id });
    },

    joinTrip: async (parent, { id,userJoining }) => {
   
    let userData= await  Trip.findOneAndUpdate(
      { _id: id },
      { $addToSet: { travelmates: userJoining } },
      {new:true}); 
      userData = await userData.populate('creator travelmates tripType')   
 
      return  userData
    },
    

   

   // delete a user and consequently delete its profile 
    deleteUser: async (parent, { id }) => {
      let userData = await User.findOneAndDelete({ _id: id })
      let profilData = await Profile.findOneAndDelete({profileUser:id})
      return await userData;

    },

   



  },
};


module.exports = resolvers;
