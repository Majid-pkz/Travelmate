const { Schema, model } = require("mongoose");


const interestSchema = new Schema({
  
  

  label: {
    type: String,
    required: true,
  },

}



);

const Interest = model('Interest', interestSchema);
module.exports = Interest;