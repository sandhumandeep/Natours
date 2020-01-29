const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError  = require('../utils/appError');
const bcrypt = require('bcryptjs');
const util = require('util');

const signtoken = id =>{
   return jwt.sign({id },  process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXP
    })
}

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    });

    const token = signtoken(newUser._id);

    res.status(201).json({
        status : 'success',
        token,
        date : {
            user : newUser
        }
    })

});

exports.login = catchAsync(async (req,res,next) => {

    const {email, password} = req.body;
    
    //1) check if user enters both email and password
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2) check if email exists and password is correct
   const user = await User.findOne({email}).select('+password');
   

   if(!user || !(await user.correctPassword(password, user.password)))
   {
        // console.log(password, user.password)
      
        // console.log( await (user.correctPassword(password, user.password)) );
        return next(new AppError('Invalid email or password', 401))
        
   }

   const token = signtoken(user._id);

   res.status(200).json({
       status : 'success',
       token
   });

});

exports.protect = catchAsync(async(req,res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    if(!token)
    {
        return next(new AppError('Please login to access all tours'), 401);
    }

   const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
   
   console.log(decoded);

   const freshUser = await User.findById(decoded._id);

   if(!freshUser)
   {
       return next(new AppError('The token belonging to this user no longer exist'));
   }
    

})