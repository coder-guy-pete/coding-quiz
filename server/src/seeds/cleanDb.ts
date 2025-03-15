import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model.db || !model.db.db) {
      console.warn(`Model ${modelName} does not have a database connection`);
      return;
    }

    const modelExists = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
