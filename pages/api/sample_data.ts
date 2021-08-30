import movies from '../../models/sample/movies';
import dbConnect from '../../lib/mongodb';

export async function getAllMovieSampleData(){  
  await dbConnect();
  const data = await movies.findById('573a1390f29313caabcd4135').lean();
  return data; 
}
