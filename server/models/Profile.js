const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    location:{
      type: String,
    // required: true,
    },
    joinedDate:{
      type: Date,

    },
    gender:{
      type: String,

    },
    age:{
      type: Number,

    },
    bio:{
      type: String,

    },
    interests:{
      type: String,

    },
    image:{
      type: String,

    },
    verified:{
      type: Boolean,
    default: false,

    },
    subscriptionDate:{
      type: Date,
    default: null,

    },
    subsLength:{
      type: Number
    },
    // subscriptionExpiry:{
    //   type: Date,

    // },  
   
    createdTrips:[ {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      // required: true, should not be required 
    }],

    profileUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      // age calculation based on DOB
    },
  }
);

// when we query a user, we'll also get another field called `TripCount` with the number of created trip
profileSchema.virtual('tripCount').get(function () {
  return this.createdTrips.length;
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;