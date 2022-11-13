//External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

//Global Variables
export const collections: {games?: mongoDB.Collection} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    'mongodb+srv://gusreinaos:<password>@cluster0.x1srwma.mongodb.net/test'
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const gamesCollection: mongoDB.Collection = db.collection(
    'process.env.GAMES_COLLECTION_NAME'
  );
  collections.games = gamesCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
  );
}
