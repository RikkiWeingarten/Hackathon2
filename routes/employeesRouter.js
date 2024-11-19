import { Router } from "express";
import { upload } from "../utils/upload.utils.js";
import {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
  getEmployeeById,
  searchEmployees,
  _uploadSingle,
} from "../controllers/employeesController.js";

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

router.post("/upload-single", upload.single("file"), _uploadSingle);

export default router;
