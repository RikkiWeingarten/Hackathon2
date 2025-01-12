import knex from "knex";
import dotenv from "dotenv";
dotenv.config(); 

export const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl: {
      rejectUnauthorized: false, // Set to true if you have a trusted certificate
    },
  },
});