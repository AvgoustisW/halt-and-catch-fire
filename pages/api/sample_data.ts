
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';

const MONGODB_URI_SAMPLE = process.env.MONGODB_URI_SAMPLE as string
const MONGODB_DB_SAMPLE = process.env.MONGODB_DB_SAMPLE as string

import moviesSchema from '../../models/sample/movies';

import db from '../../middleware/mongodb';
import {fixUnserialized} from '../../tools/general';

export async function getAllSampleData(){  
  await mongoose.disconnect();
  await mongoose.connect(MONGODB_URI_SAMPLE);
  const data = await mongoose.model('movies').findById('573a1390f29313caabcd4135')
  return fixUnserialized(data);  
}
