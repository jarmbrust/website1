import { ref } from 'vue';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const users = ref<Collection<Document> | null>(null);
const client = ref<MongoClient | null>(null);

export default async (request: Request) => {
  try {
    const connectionString = process.env.MONGODB_URI2;
    if (!connectionString) {
      console.error('MONGODB_URI environment variable is not set');
    };
    if (request.method !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    };
    client.value = new MongoClient(connectionString as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    const database = client.value.db('james3k_prod');
    users.value = database.collection('users');

    const { username, password } = await request.json();
    const user = await users.value.findOne({ username });

    if (user) {
      const result = await client.value.db('james3k_prod').collection('users').findOne({ username });
      const match = await bcrypt.compare(password, result?.password);
      if (match) {
        const permissions: string[] = result?.permissions;
        console.log('Login successful!');
        if (!process.env.JWT_SECRET) {
          console.error('JWT_SECRET environment variable is not set');
          return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        const token = jwt.sign({ success: true, permissions }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return new Response(JSON.stringify({ message: 'Cookie set successfully' }), {
          status: 200,
          headers: {
            'Set-Cookie': `userPermissionsCookie=${token}; Max-Age=3600; Secure; HttpOnly; SameSite=Strict; Path=/ Domain=.james3k.com`,
          }
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: 'Invalid username or password.' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      };
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid username or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err: unknown) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: 'An error occurred.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.value?.close();
  }
};
