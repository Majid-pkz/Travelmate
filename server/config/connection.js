const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travelmate-test');

module.exports = mongoose.connection;
