import { MongoClient } from "mongodb";

export default function clienteDbMongo() {
  const uri = "mongodb://127.0.0.1:27017";
  //const uri = "mongodb://mongo:27017";
  const client = new MongoClient(uri);
  const database = client.db("Site_Animes");
  return database;
}