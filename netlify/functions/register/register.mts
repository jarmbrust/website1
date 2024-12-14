import bcrypt from 'bcrypt';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
// import 'dotenv/config';
import { ref } from 'vue';

const saltRounds = 10; // Number of salt rounds for bcrypt
const users = ref<Collection<Document> | null>(null);
const client = ref<MongoClient | null>(null);

export default async (request: Request) => {

  try {
    const connectionString = process.env.MONGODB_URI2;
    if (!connectionString) {
      console.error('MONGODB_URI environment variable is not set');
    }
    client.value = new MongoClient(connectionString as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    const database = client.value.db('james3k_prod');
    users.value = database.collection('users');
    console.log('Connected to MongoDB (register)!');

    await client.value.connect();
    const { username, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = {
      "username": username,
      "password": hashedPassword
    };

    const result = await client.value.db('james3k_prod').collection('users').insertOne(data);
    console.log(`New user created with the following id: ${result.insertedId}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return new Response(JSON.stringify({ error: 'Error connecting to MongoDB' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.value?.close();
  }
};

