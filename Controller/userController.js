const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`../Myproject/tours-simple.json`));
//User Functions
exports.getAllusers = (req,res) =>{
    res.status(500).json({
        status : 'error',
        messagae : 'route not defined'
    });
   
}
exports.createUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        messagae : 'route not defined'
    });
   
}

exports.updateUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        messagae : 'route not defined'
    });
   
}

exports.deleteUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        messagae : 'route not defined'
    });
   
}

exports.getUser = (req,res) =>{
    res.status(500).json({
        status : 'error',
        messagae : 'route not defined'
    });
   
}
