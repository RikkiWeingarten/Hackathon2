import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { files_router } from "./routes/upload.routes.js";
import router from "./routes/employees.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT || 4000, () => {
  console.log(`run on ${process.env.PORT || 4000}`);
});
app.use("/", files_router);
app.use("/", express.static(path.resolve() + "/public"));

app.use("/employees", router);
