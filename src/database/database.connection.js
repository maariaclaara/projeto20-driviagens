import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl: false
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

const db = new Pool(configDatabase);

db.connect((error, client, done) => {
  if (error) {
    console.error(error);
  } else {
    done();
  }
});

export default db;