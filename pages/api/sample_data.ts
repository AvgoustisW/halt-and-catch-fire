
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';

const MONGODB_URI_SAMPLE = process.env.MONGODB_URI_SAMPLE as string
const MONGODB_DB_SAMPLE = process.env.MONGODB_DB_SAMPLE as string

import moviesSchema from '../../models/sample/movies';

import dbConnect from '../../middleware/mongodb';
import {fixUnserialized} from '../../tools/general';

export async function getAllSampleData(){  
  if (!mongoose.connection.readyState) await mongoose.connect(MONGODB_URI_SAMPLE);
  if (!mongoose.models.Movies) mongoose.model('Movies', moviesSchema);
  const data = await mongoose.model('Movies').findById('573a1390f29313caabcd4135').lean();
  return fixUnserialized(data); //https://github.com/vercel/next.js/issues/11993 
}
