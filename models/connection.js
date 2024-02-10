const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://canniconnect:FullSt4ck@cluster0.dgcnj19.mongodb.net/caniconnect';

mongoose.connect('mongodb+srv://canniconnect:FullSt4ck@cluster0.dgcnj19.mongodb.net/caniconnect', { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));

// URL du backend : https://backend-one-nu-35.vercel.app/