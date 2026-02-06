import mongodb from "../database/index.mts";
import type {Alert} from "./types.mts";

async function getAllAlerts(): Promise<Alert[] | null> {
    const data = (await mongodb.getDb().collection<Alert>("alerts").find({}).toArray());
    console.log(data)
    return data ;
}

async function getActiveAlerts(): Promise<Alert[] | null> {
    const data = (await mongodb.getDb().collection<Alert>("alerts").find({
        status: "active"
      }).toArray());
    console.log(data);
    return data;
}

async function addAlert(alert: Alert): Promise<void> {
    await mongodb.getDb().collection<Alert>("alerts").insertOne(alert);
    console.log(`Alert with id ${alert.id} added to the database.`);
}

async function dropAlert(): Promise<void> {
    await mongodb.getDb().collection<Alert>("alerts").drop();
    console.log(`Alerts collection dropped.`);
}

async function updateAlert(alert: Alert): Promise<void> {
    await mongodb.getDb().collection<Alert>("alerts").replaceOne({ id: alert.id }, alert);
    console.log(`Alert with id ${alert.id} updated in the database.`);
}

async function deleteAlert(id: string): Promise<void> {
    await mongodb.getDb().collection<Alert>("alerts").deleteOne({ id });
    console.log(`Alert with id ${id} deleted from the database.`);
}

export default {
    getAllAlerts,
    getActiveAlerts,
    addAlert,
    dropAlert,
    updateAlert,
    deleteAlert
};