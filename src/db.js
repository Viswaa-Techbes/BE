const mongoose = require('mongoose');
const { mongodbUri } = require('./config/env.config');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.info('✓ MongoDB connected');
};

module.exports = { connectDB };