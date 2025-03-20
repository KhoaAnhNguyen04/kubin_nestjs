import { MongoClient, Db } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'my_db';

export const connectToMongo = async (): Promise<Db> => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB ✅');
  return client.db(DB_NAME);
};
