import mongodb from "../database/index.mts";
import type {Users} from "./types.mts";
import * as argon2 from "argon2";

async function getAllusers(): Promise<Users[] | null> {
    const data = (await mongodb.getDb().collection<Users>("users").find({}).toArray());
    console.log(data)
    return data ;
}

async function getUserById(id: string): Promise<Users | null> {
  const data = await mongodb.getDb().collection<Users>("users").findOne({ id })
  console.log(data);
  return data;
}

async function addUser(user: Users): Promise<void> {
    user.password = await argon2.hash(user.password);
    await mongodb.getDb().collection<Users>("users").insertOne(user);
    console.log(`User with id ${user.name} added to the database.`);
}

async function updateUser(user: Users): Promise<void> {
    user.password = await argon2.hash(user.password);
    await mongodb.getDb().collection<Users>("users").replaceOne({ id: user.id }, user);
    console.log(`User with id ${user.name} updated in the database.`);
}

async function dropUser(): Promise<void> {
    await mongodb.getDb().collection<Users>("users").drop();
    console.log(`Users collection dropped.`);
}

export default {
    getAllusers,
    addUser,
    dropUser,
    getUserById,
    updateUser
};