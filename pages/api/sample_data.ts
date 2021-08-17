import { connectToSampleDatabase } from "../../lib/mongodb";

export default async (req: any, res: any) => {
  const { db } = await connectToSampleDatabase();
  const sample_data = await db
  .collection("listingsAndReviews")
  .find({})
  .sort({ metacritic: -1 })
  .limit(20)
  .toArray();
  res.json(sample_data);

};