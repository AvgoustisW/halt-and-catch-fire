import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB
const MONGODB_URI_SAMPLE = process.env.MONGODB_URI_SAMPLE
const MONGODB_DB_SAMPLE = process.env.MONGODB_DB_SAMPLE


if (!MONGODB_URI) {
  throw new Error(
    'URI Error'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'DB Collection Error'
  )
}


const db = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(MONGODB_URI_SAMPLE, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default db;