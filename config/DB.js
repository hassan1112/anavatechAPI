let { Sequelize } = require("sequelize");
let mysql2 = require("mysql2");
let config = require("./Config");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  dialectModule: mysql2,
  logging: false,
  // pool: {
  //   max: config.pool.max,
  //   min: config.pool.min,
  //   acquire: config.pool.acquire,
  //   idle: config.pool.idle,
  // },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = require("../models/EmployeeModel")(sequelize, Sequelize);
db.Bank = require("../models/BankModel")(sequelize, Sequelize);
db.Position = require("../models/PositionModel")(sequelize, Sequelize);

db.InactiveReason = require("../models/InactiveReasonModel")(
  sequelize,
  Sequelize
);
db.Department = require("../models/DepartmentModel")(sequelize, Sequelize);
db.SystemUser = require("../models/systemUserModel")(sequelize, Sequelize);
db.Allowance = require("../models/AllowanceModel")(sequelize, Sequelize);

db.EmpLevel = require("../models/EmpLevelModel")(sequelize, Sequelize);
db.Class = require("../models/ClassModel")(sequelize, Sequelize);
db.EmpDiploma = require("../models/EmpDiplomaModel")(sequelize, Sequelize);
db.EmpIncrementMapping = require("../models/EmpIncrementMapping")(
  sequelize,
  Sequelize
);
db.SalaryIndex = require("../models/salaryIndexModel")(sequelize, Sequelize);

db.Major = require("../models/MajorModel")(sequelize, Sequelize);
db.EmpDepartmentMapping = require("../models/EmpDepartmentMappingModel")(
  sequelize,
  Sequelize
);
db.EmpPositionMapping  = require("../models/EmpPositionMappingModel")(
  sequelize,
  Sequelize
);

//emp table Association
db.Bank.hasMany(db.Employee, { foreignKey: "bankId" });
db.InactiveReason.hasMany(db.Employee, { foreignKey: "InactiveReasonId" });
db.Position.hasOne(db.Employee, { foreignKey: "positionId" });

db.SystemUser.hasOne(db.InactiveReason, { foreignKey: "systemUserId" });
db.Employee.hasOne(db.InactiveReason, { foreignKey: "empId" });


// db.Department.hasOne(db.Employee, { foreignKey: "departmentId",});



db.Department.belongsToMany(db.Employee, {through:"EmpDepartmentMapping", foreignKey: 'departmentId'});
db.Employee.belongsToMany(db.Department, {through:"EmpDepartmentMapping", foreignKey: 'empId'});



db.Position.belongsToMany(db.Employee, {through:"EmpPositionMapping", foreignKey: 'positionId'});
db.Employee.belongsToMany(db.Position, {through:"EmpPositionMapping", foreignKey: 'empId'});




//// db.Employee.hasOne(db.EmpDepartntMapping, { foreignKey: "empId" });
 

// db.EmpDiploma.hasOne(db.Employee, { foreignKey: "EmpDiplomaId",});
// db.Class.hasOne(db.Employee, { foreignKey: "ClassId",});

//allowance table Association
db.Employee.hasOne(db.EmpIncrementMapping, { foreignKey: "empId" });
db.Department.hasOne(db.Allowance, { foreignKey: "departmentId" });
db.Position.hasOne(db.Allowance, { foreignKey: "positionId" });

module.exports = db;
