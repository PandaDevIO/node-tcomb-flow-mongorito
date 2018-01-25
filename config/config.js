import mongoose from 'mongoose';

const MONGOLAB_URI = process.env.MONGO_URI;
mongoose.connect(MONGOLAB_URI, { useMongoClient: true });

global.Mongoose = mongoose;

export default {
  SECRET: process.env.SECRET,
};