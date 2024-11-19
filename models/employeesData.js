import { db } from "../config/neondb.js"


  const getAllEmployeesDB = () => {
    return db('employees').select('id', 'name', 'status', 'image');
  };

  const getEmployeeByIdDB = (id) => {
    return db('employees').select('id', 'name', 'status', 'image')
    .where({id});
  }

  const insertEmployeeDB = (name, status) => {
    return db('employees').insert({name, status},["id", "name", "status"]);
  }
  
  await db("employees")
  
  const uploadSingle = (id, image) => {
    return db("employees").where({ id })
    .update({ image });
  }



 export {
    getAllEmployeesDB,
    getEmployeeByIdDB,
    insertEmployeeDB,
    uploadSingle
  }