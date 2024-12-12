// import { Context } from '@netlify/functions'
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI as string;

export default async (request: Request) => {
  const client = new MongoClient(uri);//, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('james3k_db');
    const users = database.collection('users');

    const { username, password } = await request.json()
    const user = await users.findOne({ username });
    console.log('user:::', user, username);


    if (user) {
      const result = await client.db('james3k_db').collection('users').findOne({ username });
      console.log('result:::', result);
      const match = await bcrypt.compare(password, result?.hashedPassword);

      if (match) {
        console.log('Login successful!');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        console.log('Invalid email or password.');
        return new Response(JSON.stringify({ success: false }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      console.log('User not found.');
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}
