var inquirer = require("inquirer");
const DbHelpers = require("./util/dbHelpers.js");
var mysql = require("mysql");
const dbHelpers = new DbHelpers() 
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Misha754",
  database: "employee_trackerDB"
});
connection.connect(async function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  await afterConnection();
  });
 async function afterConnection() {
 try {
  const first = await inquirer.prompt(
    [{
        type: "list",
        message: "What would you like to do?",
        choices: [ "Add employee", "View all employees", "View all department","Add department", "Add role", "Update employee", "Quet"],
        // Sleckt all table employee
         name: "userChoice"
    }]
  );
  const {userChoice} = first;
  switch (userChoice)  {
    case "View all employees":
     dbHelpers.viewEmployee(connection);
      //afterConnection();
    break;
    case "Add employee": {
      const employeeQuestions = [{ 
        type: "input",
        message: "What a first name?",
         name: "first_name"
       },
       {
        type: "input",
        message: "What a last name?",
        name: "last_name"
       },
       {
        type: "number",
        message: "What is the rmployee role ID?",
        name: "role_id" 
        
       }]
      const addNew = await inquirer.prompt(
        employeeQuestions
      );
      dbHelpers.addEmployee(connection, addNew);
      break;

   //=====View all department=======

      case "View all department":
      dbHelpers.viewDepartment(connection);
      break;

    }
  }catch ( err ) {
    throw err
  }  
  case "Add department": {
    let userInput = [{
      type: "input",
      name: "department",
      message: "What is the department that you want to add?"
    }]
    const newDepartment = await inquirer.prompt(
      userInput
    );
  }
    dbHelpers.addDepartment(connection, newDepartment);
    break;
  
} 

