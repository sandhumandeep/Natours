const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
const Tour = require('./Models/tourModel');


// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));

const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8')); 

//Import Data
const ImportData = async () => {
    try{
        await Tour.create(tours);
        console.log("Tours created");
        
    }
    catch(err)
    {
        console.log(err)
    }
    process.exit();
}

//Delete Data from DB
const DeleteDB = async ()=>{
    try {
        await Tour.deleteMany();
        console.log("DB deleted")
        
    }
    catch(err){
        console.log(err)
    }
    process.exit();
}

if(process.argv[2] === '--import')
{
    ImportData();
}
else if(process.argv[2] === '--delete')
{
    DeleteDB();
}
// DeleteDB();
console.log(process.argv);