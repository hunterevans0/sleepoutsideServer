import { type Db, MongoClient, ServerApiVersion } from "mongodb";
import { products } from "./data/products.js";

// node --env-file=.env src/database/init-db.ts

const URI = process.env.MONGO_URI;

if (!URI) {
  throw new Error("No Uri found in environment");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//define the init function to connect to our database and create collections
const init = async () => {
  try {
    await client.connect();
    console.log(`Connecting to MongoDB`);

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    // get a reference to the actual database we will be using with .db(<database name>)
    const db = client.db("sleepoutside");

    // initialize the Products collection
    await seedProducts(db);
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    await client.close();
  }
};

const lowerCaseKeys = function (obj: Record<string,any> | Array<any>) {
  // if it is an object, but NOT an array, then we need to iterate through all of its keys
  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (let key in obj) {
      // take the first letter (key[0]) of the key and make it lowercase
      // then add that to the rest of the key after REMOVING the first letter (key.slice(1))
      let newKey = key[0]?.toLowerCase() + key.slice(1);
      // if the value of this key is an object, then we need to call this function again
      if (typeof obj[key] === "object") {
        obj[newKey] = lowerCaseKeys(obj[key]);
        delete obj[key];
      } else {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
  } else if (Array.isArray(obj)) {
    // if it is an array, then we need to iterate through each item in the array
    // and for each object value call the function again.
    for (let i = 0; i < obj.length; i++) {
      let item = obj[i];
      if (typeof item === "object") {
        obj[i] = lowerCaseKeys(item);
      }
    }
  }
  return obj;
};

const seedProducts = async (db: Db) => {
  // we need to make a small transform to the provided data before inserting
  // use .map() to transform each product before inserting it into the database
  // change Reviews.ReviewUrl to match the following pattern: /products/<productId>/reviews/
  // while we are at it...the data provided used a PascalCase naming convention for its keys. Use the provided lowerCaseKeys function to convert all keys to camelCase. This will make it consistent with the rest of our models.
  const reformattedProducts = lowerCaseKeys(
    products.map((product) => {
      const newReview = {
        ...product.Reviews,
        ReviewsUrl: `/products/${product.Id}/reviews/`,
      };
      return { ...product, Reviews: newReview };
    }),
  );

  try {
    // drop the collection to clear out the old records
    db.dropCollection("products");
    console.log("Collection 'products' dropped successfully");

    // create a new collection
    db.createCollection("products");
    console.log("Collection 'products' created successfully");

    // Drop and add alerts
    db.dropCollection("alerts");
    console.log("Collection 'alerts' dropped successfully");

    db.createCollection("alerts");
    console.log("Collection 'alerts' created successfully");

    // Drop and add users
    db.dropCollection("users");
    console.log("Collection 'users' dropped successfully");

    db.createCollection("users");
    console.log("Collection 'users' created successfully");

    // Drop and add reviews
    db.dropCollection("reviews");
    console.log("Collection 'reviews' dropped successfully");

    db.createCollection("reviews");
    console.log("Collection 'reviews' created successfully");

    // create indexes for the users collection
    await db.collection("users").createIndex({ name: 1 });
    await db.collection("users").createIndex({ email: 1 });

    // create indexes for the products collection
    await db.collection("products").createIndex({ name: 1 });
    await db.collection("products").createIndex({ description: 1 });
    await db.collection("products").createIndex({ category: 1 });
    await db.collection("products").createIndex({ id: 1 });

    // insert all products
    const result = await db.collection("products").insertMany(reformattedProducts as any)

    console.log(
      `${result.insertedCount} new listing(s) created with the following id(s):`,
    );
    console.log(result.insertedIds);
  } catch (error) {
    console.error((error as Error).message);
  }
};

init();
