const fs = require('fs');
const AppError = require('../utils/appError');
const User = require('./../Models/userModel');
const catchAsync = require('../utils/catchAsync');


const tours = JSON.parse(fs.readFileSync(`../Myproject/tours-simple.json`));

//User Functions
exports.getAllusers = catchAsync(async (req,res,next) =>{
    const Users = await User.find();

       res.status(200).json({
        status : 'success',
        result : Users.length,
        data : {
            Users
        }

    });
    
});


exports.createUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        message : 'route not defined'
    });
   
}

exports.updateUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        message : 'route not defined'
    });
   
}

exports.deleteUser = catchAsync(async(req,res,next) =>{
    
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user)
    {
           return next(new AppError('New user found by this id!', 404)) 
    }
    res.status(204).json({
        status : 'success',
        message : 'User deleted successfully'
    });
    next();
   
});

exports.getUser = catchAsync(async (req,res,next) =>{
    

    const user =  await User.findById(req.params.id)
    console.log(user);
    console.log(req.params.id);
    res.status(200).json({
        status : 'success',
        data : {
            user
        }
    });
   
});
