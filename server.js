const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const app = require('./app');    

process.on('uncaughtException', err=>{
    console.log("Error");
    console.log(err.name, err.message);
    process.exit(1);
})


// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));


const server = app.listen(process.env.PORT, () =>{
    console.log('server running');
})

process.on('unhandledRejection', err =>{
    console.log('ERROR!!');
    console.log(err.name, err.message);
    server.close(() =>{
        process.exit(1);
    })
})