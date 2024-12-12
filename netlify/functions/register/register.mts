import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI as string;
const saltRounds = 10; // Number of salt rounds for bcrypt

export default async (request: Request) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const { username, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await client.db('james3k_db').collection('users').insertOne({username, hashedPassword});

    console.log(`New listing created with the following id: ${result.insertedId}`);

  } finally {
      await client.close();
  }
}
