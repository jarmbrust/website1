import { MongoClient } from 'mongodb';
import 'dotenv/config';
// import type { Context } from '@netlify/functions';

const uri = process.env.MONGODB_URI;

async function main() {
    console.log('in main');
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

        await createUser(client, {
          username: username,
          password: password
        });

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function createUser(client, newUser) {
  const result = await client.db('james3k_db').collection('users').insertOne(newUser);
  console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
