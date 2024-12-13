import bcrypt from 'bcrypt';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI_PROD as string;

export default async (request: Request) => {
  // const client = new MongoClient(uri);

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    const database = client.db('james3k_prod');
    const users = database.collection('users');

    const { username, password } = await request.json()
    const user = await users.findOne({ username });
    console.log('user:::', user, username);

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

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



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<db_username>:<db_password>@personalwebsite.qtist.mongodb.net/?retryWrites=true&w=majority&appName=personalwebsite";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
