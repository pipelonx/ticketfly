const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
