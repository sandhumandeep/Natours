const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError  = require('../utils/appError');
const bcrypt = require('bcryptjs');

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
   const correct = await user.correctPassword(password, user.password);
    console.log(user.password);
   console.log(correct);

   console.log(user);

    console.log('mani');

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