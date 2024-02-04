const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Amettre/canniconnect';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
