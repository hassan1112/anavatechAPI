const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const config = require('../config/Config');
const AppError = require('../util/AppError')
const db = require("../config/DB");
const { promisify } = require('util');
const catchAsync = require('../util/CatchAsync')
const SystemUser = db.SystemUser;
var expiresIn = new Date().getTime() + 60 * 1000

const signToken = usr => {
    return jwt.sign({ usr }, config.SECRETE, {
      expiresIn: expiresIn,
      algorithm: "HS256"
    });
  };
  

  exports.SignUp = function(req, res) {

     hashedPassword = bcrypt.hashSync(req.body.password, 8);
 
     const   systemUserId = req.body.systemUserId;
      const  password = req.body.password;
      const  email = req.body.email;
      const   isActive = req.body.isActive;
     const  accessToken = req.body.accessToken;
     
  
    

     SystemUser.create({
            email: email,
            password: password, 
            isActive: isActive,
            accessToken: accessToken,
               
    }).then(data => {

   const token= signToken(data.systemUserId);
        res.status(201).json({
        message: 'New User has been created.',
        token:token,
        data:data,
        statuscode:201
    })})
    .catch(error => res.status(500).res.json({
        error: error,
        statuscode:500
      
    }));
};



exports.login = (req,res)=> {
    const email = req.body.email;
    const password = req.body.password;
     
    SystemUser.findOne({email:email,password:password}).then(user => {
      console.log(user)
        if(!user){
            return res.send({email:"User email  does not exist"})
        } 
  const isMatch =  bcrypt.compare(password,user.password)
   if(isMatch)
   {
    const token = signToken(user.userId)
        if(token){
        res.json({
              status:200,
              token : token,
              success:true,
              user:user
          });
        }
        else
      {
          return res.send({password:"token is wrong "});
      }
    }
    else
    {
      return res.send({password:"password is incorrect please try tologin with the correct password "});

    }
});

};






exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
      token = req.headers.authorization.split(' ')[1];
     } 
    
  console.log(req.headers.authorization)
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    const decoded = await promisify(jwt.verify)(token,config.SECRETE);
 
    const currentUser = await User.findOne(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
      req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });
  
  