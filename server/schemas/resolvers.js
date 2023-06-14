const { Trip, User, TripType, Profile, Interest } = require("../models");
 const {AuthenticationError, ApolloError} = require('apollo-server-express');
 const { signToken } = require('../utils/auth');

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


    //populate('classes').populate({
    //   path: 'classes',
    //   populate: 'professor'
    // });

    // profiles:  async () => {
    //   const profiles = await Profile.find({}).populate('profileUser').populate('interests').
    //   populate('createdTrips').;     
    //   return profiles;
    // }, 
    profiles:  async () => {
      const profiles = await Profile.find({}).populate('createdTrips').populate({
          path: 'createdTrips',
          populate: 'creator tripType'
        }).populate('profileUser').populate('interests');   
      return profiles;
    }, 

    me: async (parent, args, context) => {
      console.log('00000000000000000000000000000000000000000000000------------------------',context)
      console.log('------------------------this is context.user',context.user)
      
      if (context.user) {
        const profiles = await Profile.findOne({profileUser:context.user._id  }).populate('createdTrips').populate({
          path: 'createdTrips',
          populate: 'creator tripType'
        }).populate('profileUser').populate('interests');   
      return profiles;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

 
  
    profile: async (parent, args) => {
      // Use the parameter to find the matching user in the collection
      console.log(args)
     let profile = await Profile.findById(args.id).populate('profileUser').populate('interests').
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

    // searchTrips: async (parent, {departureLocation}) => {
    //   const trips = await Trip.find({departureLocation}).populate('creator').populate('tripType').populate('travelmates');
    //   return trips;
    // },

    // searchTrips: async (parent, { departureLocation }) => {
    //   const trips = await Trip.find({ departureLocation: { $regex: new RegExp(`^${departureLocation}$`, 'i') } })
    //     .populate('creator')
    //     .populate('tripType')
    //     .populate('travelmates');
    //   return trips;
    // },
    searchTrips: async (parent, { departureLocation }) => {
      const searchQuery = new RegExp(departureLocation, 'i'); // 'i' flag for case-insensitive search
    
      const trips = await Trip.find({ departureLocation: { $regex: searchQuery } })
        .populate('creator')
        .populate('tripType')
        .populate('travelmates');
    
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



    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },






    //destructure
    createUser: async (parent, {  firstname, lastname, email, password, isAdmin }) => {
      const user = await User.create({ firstname, lastname, email, password,isAdmin });
      const token = signToken(user);
      return { token, user };

    },

    createProfile: async(parent,params,context)=>{
      if (context.user) {
      return (await Profile.create(params)).populate('profileUser interests')
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    createTripType: async (parent, tripType) => {
      return await TripType.create(tripType);
    },


    createInterests: async (parent, interests) => {
      return await Interest.create(interests);
    },

    createTrip: async (parent, params, context) => {
      //  const {creator, title, description, departureLocation, destination, tripType} = params

      // this await await does not seems to be correct but working  needs review
      if (context.user) {
      let trip = await  Trip.create(params);
     console.log('--------------params:  ',params)
     console.log('--------------trip._id:  ',trip._id)
     console.log('--------------trip.id:  ',trip.id)
     console.log('--------params.creator:   ',params.creator)
     console.log('This is context.user when creating a trip',context.user)
     await Profile.findOneAndUpdate(
        { profileUser: context.user._id},
        { $addToSet: { createdTrips: trip.id } },
        {new:true}
      );
      // trip =  await Trip.findById(trip._id).populate('creator').populate('tripType')
      trip =  await trip.populate('creator tripType travelmates')
      
      return trip;

     }
     throw new AuthenticationError('You need to be logged in!');
    },



    updateUser: async (parent, { id, firstname, lastname, email, password }, context) => {
      // Find and update
         if (context.user) {
      return await User.findOneAndUpdate(
        { _id: id },
        { firstname, lastname, email, password },
        // Return the newly updated object instead of the original
        { new: true }
      );
      }

      throw new AuthenticationError('You need to be logged in!');
    },
 

    updateProfile:async (parent, params, context) => {
      if (context.user) {  
      console.log(params.id)
      return await Profile.findOneAndUpdate(
        { _id: params.id },
        params,
        { new: true }
      ).populate('profileUser interests createdTrips');
      }
      throw new AuthenticationError('You need to be logged in!');
    },





        removeTrip: async (parent, { id }, context) => {
          if (context.user) {

      return await Trip.findOneAndDelete({ _id: id });
          }
      throw new AuthenticationError('You need to be logged in!');
    },

    joinTrip: async (parent, { id,userJoining }, context) => {

      if (context.user) {
   
    let userData= await  Trip.findOneAndUpdate(
      { _id: id },
      { $addToSet: { travelmates: userJoining } },
      {new:true}); 
      userData = await userData.populate('creator travelmates tripType')   
 
       return  userData
       }

      throw new AuthenticationError('You need to be logged in!');
    },
    

   

   // delete a user and consequently delete its profile 
    deleteUser: async (parent, { id }, context) => {
      if (context.user) {
      
      let userData = await User.findOneAndDelete({ _id: id })
      let profilData = await Profile.findOneAndDelete({profileUser:id})
      return await userData;
       }
    throw new AuthenticationError('You need to be logged in!');

    },
  // removing a previously added interest from a profile
    removeAnInterest:  async (parent, { id,interestId }, context) => {
      if (context.user) {
   
      let profData= await  Profile.findOneAndUpdate(
        { _id: id },
        { $pull: { interests: interestId } },
        {new:true}); 
        profData = await profData.populate('profileUser interests createdTrips')   
   
        return await profData
       }
       throw new AuthenticationError('You need to be logged in!');
      },
      // add an interest from the list to  a profile
    addAnInterest:  async (parent, { id,interestId }, context) => {
      if (context.user) {
   
      let profData= await  Profile.findOneAndUpdate(
        { _id: id },
        { $addToSet: { interests: interestId } },
        {new:true}); 
        profData = await profData.populate('profileUser interests createdTrips')   
   
        return await profData
        }
      throw new AuthenticationError('You need to be logged in!');
      },


   

    }

 
};


module.exports = resolvers;
