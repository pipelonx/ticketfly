// config/config.js
module.exports = {
    dbURI: process.env.DB_URI || 'mongodb://localhost:27017/ticketing-platform',
    port: process.env.PORT || 3000,
  };
  