const { Trip, User, TripType } = require("../models");

const resolvers = {
  Query: {
    users:  async () => {
      const users = await User.find({}).populate('createdTrips');
      console.log(users);
      return users;
    },

   
    
    

    // Define a resolver to retrieve individual user
    user: async (parent, args) => {
      // Use the parameter to find the matching user in the collection
     
      return User.findById(args.id).populate('createdTrips');
    },

    
    
   trips: async () => {
      const trips = await Trip.find({}).populate('creator').populate('tripType').populate('travelmates');
      console.log(trips);
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
  },

  Mutation: {
    //destructure
    createUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password });
    },

    updateUser: async (parent, { id, username }) => {
      // Find and update
      return await User.findOneAndUpdate(
        { _id: id },
        { username },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },

    //   could be destructure later. this is just for test --- note: destructure did not work for me. find out why?
    createTrip: async (parent, params) => {
      //  const {creator, title, description, departureLocation, destination, tripType} = params

      // this await await does not seems to be correct but working  needs review

      let trip = (await (await Trip.create(params)).populate("tripType")).populate("creator");
      console.log(params.creator)
     await User.findOneAndUpdate(
        { _id: params.creator },
        { $addToSet: { createdTrips: trip._id } },
        {new:true}
      );
      
      return trip;
    },

    removeTrip: async (parent, { id ,Something}) => {
      return Trip.findOneAndDelete({ _id: id });
    },

    joinTrip: async (parent, { id,userJoining }) => {
   
    const userData= await  Trip.findOneAndUpdate(
      { _id: id },
      { $addToSet: { travelmates: userJoining } },
      {new:true});

     
     
 
      return  userData
    },
    

    createTripType: async (parent, tripType) => {
      return await TripType.create(tripType);
    },
  },
};


module.exports = resolvers;
