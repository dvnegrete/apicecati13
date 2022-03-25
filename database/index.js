const { MongoClient } = require("mongodb");
// const { config } = require("../config/index");
const { dbUser, dbPassword, dbName, dbHost} = require("../config/index");

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const DB_NAME = dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

var connection = null;

module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
  try {
    if (!connection) {
      const client = new MongoClient(MONGO_URI);
      connection = await client.connect()
      console.log("Conexión a MongoDB Atlas")
    }
    console.log("Reutilizando conexión")
    const db = connection.db(DB_NAME);
    resolve(db.collection(collection))
  } catch (error) {
    reject(error);
  }
})
