const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim:true
    },
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
      ref: "Profile",
      required: true,
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

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `TripCount` with the number of created trip
userSchema.virtual('tripCount').get(function () {
  return this.createdTrips.length;
});

const User = model('User', userSchema);

module.exports = User;
