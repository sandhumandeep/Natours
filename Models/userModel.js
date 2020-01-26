const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, 'Please enter your name']
    },
    email : {
        type : String,
        required : [true, 'please enter your email'],
        unique : true,
        validate : [validator.isEmail, 'Please enter a valid email'],
        lowercase : true
    },
    photo :{
        type : String
    },
    password : {
        type : String,
        required :[true, 'please enter a password'],
        select : false
    },
    passwordConfirm :{
        type : String,
        required : [true, 'enter your password again'],
        validate : {
            validator : function(el) {
                return el === this.password;
            },
            message : 'Password doesnot match' 
        }
    }
});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash('password', 12)

    this.passwordConfirm = undefined;

    next();
})


userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    // console.log(candidatePassword, userPassword);
    // console.log(await bcrypt.compare('candidatePassword', userPassword));
    // return await bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    //     if(err) return cb(err);
    //     cb(null, isMatch);
    // });
    return await bcrypt.compare(candidatePassword, userPassword)

}

const User = mongoose.model('User', userSchema);


module.exports = User;