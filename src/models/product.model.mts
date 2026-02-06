import mongodb from "../database/index.mts";
import type {Product} from "./types.mts";


async function getAllProducts(): Promise<Product[] | null> {
    const data = (await mongodb.getDb().collection<Product>("products").find({}).toArray());
    console.log(data)
    return data ;
}

async function getProductById(id: string): Promise<Product | null> {
  const data = await mongodb.getDb().collection<Product>("products").findOne({ id })
  console.log(data);
  return data;
}

async function getProductsByCategory(category: string): Promise<Product[] | null> {
  const data = await mongodb.getDb().collection<Product>("products").find({ category }).toArray();
  console.log(data);
  return data;
}

async function addProduct(product: Product): Promise<void> {
    await mongodb.getDb().collection<Product>("products").insertOne(product);
    console.log(`Product with id ${product.id} added to the database.`);
}

async function dropProduct(): Promise<void> {
    await mongodb.getDb().collection<Product>("products").drop();
    console.log(`Products collection dropped.`);
}
async function updateProduct(product: Product): Promise<void> {
    await mongodb.getDb().collection<Product>("products").replaceOne({ id: product.id }, product);
    console.log(`Product with id ${product.id} updated in the database.`);
}  

export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    addProduct,
    dropProduct,
    updateProduct
};


