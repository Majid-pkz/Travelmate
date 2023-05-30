const { Schema, model } = require("mongoose");


const tripSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  departureLocation: {
    type: String,
    required: true,
    //validation, list, autocomplete????
  },
  destination: {
    type: String,
    required: true,
    //validation, list, autocomplete????
  },

  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
    // Sets a default value of 1 weeks from now
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  travelmates:[{
    type: Schema.Types.ObjectId,
    ref: "User", 
  }],

  // Duration: {
  //   type: Number,
  //   required: true,
  // },

  tripType: {
    type: Schema.Types.ObjectId,
    ref: "TripType",
    required: true,
  },
  meetupPoint: {
    // landmark
    type: String,
    required: false,
  },
  approvedTrip: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

const Trip = model('Trip', tripSchema);
module.exports = Trip;
