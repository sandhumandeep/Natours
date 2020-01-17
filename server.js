const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const app = require('./app');    

// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));



// const tourData = new Tour({
//     name : "The Silent Grump",
//     price : 499,
 
// })

// tourData.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log("ERROR" , err);
// })

app.listen(process.env.PORT, () =>{
    console.log('server running');
})