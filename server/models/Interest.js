const { Schema, model } = require("mongoose");


const interestSchema = new Schema({
  
  

  label: {
    type: [String]
   
  },

}



);

const Interest = model('Interest', interestSchema);
module.exports = Interest;