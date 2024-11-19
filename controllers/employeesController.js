import { getAllEmployeesDB, getEmployeeByIdDB, insertEmployeeDB, uploadSingle } from "../models/employeesData.js";

const getAllEmployees = async (req, res) => {
  try {
    const data = await getAllEmployeesDB()
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'something went wrong'})
  }
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((item) => item.id == id);
  if (index === -1) {
    return res.status(404).send("employee to delete not found");
  }
  employees.splice(index, 1);
  res.json(employees);
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, status, image } = req.body;

  const index = employees.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).send("employee to update not found");
  }

  employees[index] = { ...employees[index], name, status, image };

  res.json(employees);
};

const addEmployee = async (req, res) => {
  console.log(req.body);
  const { name, status, image } = req.body;
  try {
    const data = await insertEmployeeDB(name, status, image);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'something went wrong'})
  }


};

const getEmployeeById = async (req, res) => {
  console.log(req.params);
  const { employee_id } = req.params;
  
  try {
    const data = await getEmployeeByIdDB(employee_id);
    if(!data){
      return res.sendStatus(404)
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

};
const searchEmployees = (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  const filtered = employees.filter((item) => {
    return item.name.toLowerCase().includes(name.toLowerCase());
  });
  if (filtered.length === 0) {
    return res.status(404).send("no employee match your search!!!");
  }
  res.json(filtered);
};

const _uploadSingle = async ({ employee_id, image }) => {
    try {
      const [uploadResult] = await uploadSingle(employee_id, image);

      return { message: "Image uploaded successfully" };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to upload image");
    }
};

// const _uploadSingle = async (req, res) => {
//     try {
//       const row = await uploadSingle(req.file);
//       res.json(row);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };

export {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
  getEmployeeById,
  searchEmployees,
  _uploadSingle,
};
