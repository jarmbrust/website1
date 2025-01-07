import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { ref } from 'vue';

const blogs = ref<Collection<Document> | null>(null);
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
    blogs.value = database.collection('blogs');

    await client.value.connect();
    const { blogId, title, body, formattedDate } = await request.json();
    const data = {
      blogId,
      date: formattedDate,
      title,
      body,
    };

    const result = await client.value.db('james3k_prod').collection('blogs').insertOne(data);
    console.log(`New blog created with the following id: ${result.insertedId}`);
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
