import { ref } from 'vue';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

const blogsCollection = ref<Collection<Document> | null>(null);
const client = ref<MongoClient | null>(null);

export default async () => {
  try {
    const connectionString = process.env.MONGODB_URI2;
    if (!connectionString) {
      console.error('MONGODB_URI environment variable is not set');
    };
    client.value = new MongoClient(connectionString as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    const database = client.value.db('james3k_prod');
    blogsCollection.value = database.collection('blogs');
    const blogs = await blogsCollection.value.find().toArray();

    return new Response(JSON.stringify({ success: true, blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: 'Error fetching blogs'
    };
  }
};
