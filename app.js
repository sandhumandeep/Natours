const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}



app.use(express.json());
// app.get("/", (req,res) =>{

//     res.send("Hello from express")
// });

app.use((req,res, next ) =>{
    req.reqtime = new Date().toISOString();
    console.log(req.reqtime)
    next();

})
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req,res,next) =>{

    res.status(404).json({
        status : 'fail',
        message : `Could load the page ${req.originalUrl} `
    })
})

module.exports = app; 
