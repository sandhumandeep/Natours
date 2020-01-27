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

exports.deleteUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        message : 'route not defined'
    });
   
}

exports.getUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        message : 'route not defined'
    });
   
}
