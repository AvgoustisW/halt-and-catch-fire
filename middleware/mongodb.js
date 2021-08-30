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


async function dbConnect() {
  mongoose.disconnect();
  await mongoose.connect(process.env.MONGODB_URI_SAMPLE, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
}


export default dbConnect;