import { db } from "../config/pg.config.js"


  const getAllEmployeesDB = () => {
    return db('employees').select('id', 'name', 'status');
  };

  const getEmployeeByIdDB = (id) => {
    return db('employees').select('id', 'name', 'status')
    .where({id});
  }

  const insertEmployeeDB = (name, status) => {
    return db('employees').insert({name, status},["id", "name", "status"]);
  }
  
  await db("employees")


 export {
    getAllEmployeesDB,
    getEmployeeByIdDB,
    insertEmployeeDB
  }