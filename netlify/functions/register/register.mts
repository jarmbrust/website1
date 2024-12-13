import bcrypt from 'bcrypt';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_UR2 as string;
const saltRounds = 10; // Number of salt rounds for bcrypt

export default async (request: Request) => {

  console.log('Connecting to MongoDB (register)...');
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log('Connected to MongoDB(register)!');

  try {
    await client.connect();
    const { username, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await client.db('james3k_prod').collection('users').insertOne({username, hashedPassword});

    console.log(`New user created with the following id: ${result.insertedId}`);

  } finally {
      await client.close();
  }
}
