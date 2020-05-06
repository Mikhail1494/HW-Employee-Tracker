var mysql = require("mysql");

//================ View Employee ===========================================
class DbHelpers {
  async viewEmployee(cnt) {
    try {
      await cnt.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
      });
    } catch (err) {
      throw err;
    }
  }

  //=============== View Department Function ================================

  async viewDepartment(cnt) {
    try {
      await cnt.query("SELECT * FROM department", function (err, data) {
        console.table(data);
      });
    } catch (err) {
      throw err;
    }
  }

  //=================== Add Employee ========================================
  async addEmployee(cnt, employeeData) {
    try {
      console.log("check", employeeData);
      await cnt.query(
        "INSERT INTO employee SET ?",
        {
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          role_id: employeeData.role_id,
          manager_id: null,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
        }
      );
      // logs the actual query being run

      this.viewEmployee(cnt);
    } catch (err) {
      throw err;
    }
  }

  //============= Add Department =======================

  async addDepartment(cnt, userData) {
    try {
      await cnt.query("INSERT INTO department (name) VALUES (?)", {
        department_id: userData.department_id,
      }),
        function (err, res) {
          if (err) throw err;
          console.table("Department create");
        };
    }
  }
}
module.exports = DbHelpers;
