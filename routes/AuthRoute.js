var express = require('express');
var authController = require('../Controllers/AuthController')
const employeeController = require('../Controllers/EmployeeController')
 
const router = express.Router();

router.post('/signup', authController.SignUp);
router.post('/login', authController.login);

// router.use(authController.protect); 


// router
//     .route('/')
//     .get(employeeController.getAllEmployees)
//     .post(employeeController.addEmployee)

module.exports = router;

