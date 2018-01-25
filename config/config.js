import { Database, Model } from 'mongorito';

const MONGOLAB_URI = process.env.MONGO_URI;
global.db = new Database(MONGOLAB_URI);
db.connect();

export default {
  db: {
    MONGOLAB_URI
  },
  SECRET: process.env.SECRET,
};