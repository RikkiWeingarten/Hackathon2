import { db } from "../config/pg.config.js";

export const uploadSingle = ({ id, user_id, mimetype, location, originalname }) => {
  return db("uploads").insert({ id, user_id, mimetype, location, originalname }, [
    "id",
    "user_id",
    "mimetype",
    "location",
    "originalname",
  ]);
};