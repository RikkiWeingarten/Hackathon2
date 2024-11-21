import { Router } from "express";
import {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
  getEmployeeById,
  searchEmployees
} from "../controllers/employees.controllers.js";

const router = Router();

/**
 * Read - GET
 */
router.get("/api/all", getAllEmployees);

/**
 * Delete - DELETE
 */
router.delete("/:id", deleteEmployee);

/**
 * Update - PUT
 */
router.put("/:id", updateEmployee);

/**
 * Create - POST
 */
router.post("/", addEmployee);


router.get("/all/:employee_id", getEmployeeById);
router.get("/search", searchEmployees);



export default router;
