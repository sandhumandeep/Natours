const AppError  = require('../utils/appError');

const handleCastError = err=>{
    const message = ` Invalid ${err.path} ${err.value}`;
    return new AppError(message, 400);

}

const handleDuplicateError = err =>{
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate value ${value}. Please use a different value.`
    return new AppError(message, 400);
}

const handleValidationError = err =>{
    const error = Object.values(err.errors).map(el => el.message);
    const message = `Invalid entry ${error.join('. ')}`;
    return new AppError(message, 400);
}

const prodError = (err, res) =>{
    if(err.isOperational)
        {
            res.status(err.statusCode).json({
                status : err.status,
                message : err.message
            })
        }
    else{
        console.error("Unexpected Error", err)
        res.status(500).json({
            
            status : 'error',
            message : 'Something went wrong!'
        })
    }
}

const devError = (err, res) =>{
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        error : err,
        stack : err.stack

    })
}


module.exports = (err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV === 'development')
    {
        devError(err,res);
    }else if(process.env.NODE_ENV === 'production')
        console.log('entered');
    {
         
        let error = {...err};
        console.log(error.name);
        if(error.name === 'CastError')  error = handleCastError(error);
        if(error.code === 11000) error = handleDuplicateError(error);
        if(error.name === 'ValidationError') error = handleValidationError(error);
        
        prodError(error,res);
    }

    
}