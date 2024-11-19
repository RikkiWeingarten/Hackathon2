import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const db = knex({
  client: "pg",
  connection: {
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    ssl: { rejectUnauthorized: false },
  },
});

export { db };
