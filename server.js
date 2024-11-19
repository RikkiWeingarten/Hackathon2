import express from "express";
import employeeRouter from "./routes/employeesRouter.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current file path and directory name (equivalent to __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.use("/", express.static(`${__dirname}/public`));

app.use("/employees", employeeRouter);
