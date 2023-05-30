const { Schema, model } = require("mongoose");


const tripTypeSchema = new Schema({
  
  

  tripType: {
    type: String,
    required: true,
  },
//   description: {
//     type: String,
//     required: false,
//   }

}



);

const TripType = model('TripType', tripTypeSchema);
module.exports = TripType;
