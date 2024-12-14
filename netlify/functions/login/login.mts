import { ref } from 'vue';
import bcrypt from 'bcrypt';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
// import 'dotenv/config';

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

    await client.value.connect();
    const database = client.value.db('james3k_prod');
    users.value = database.collection('users');

    const { username, password } = await request.json()
    const user = await users.value.findOne({ username });

    if (user) {
      const result = await client.value.db('james3k_prod').collection('users').findOne({ username });
      const match = await bcrypt.compare(password, result?.password);

      if (match) {
        console.log('Login successful!');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        console.error('Invalid email or password.');
        return new Response(JSON.stringify({ success: false }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      console.error('User not found.');
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return { success: false, error: error.message };
  } finally {
    await client.value?.close();
  }
}
