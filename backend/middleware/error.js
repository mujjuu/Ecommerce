const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) =>{
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not Found , Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //Mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400); 
    }

    //Wrong JWT error

    if(err.name === "JsonWebTokenError"){
        const message = `Json web Token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    //JWT Expire Error

    if(err.name === "TokenExpiredError"){
        const message = `Json web Token is Expired, Try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message : err.message,
        status : err.statusCode


    });
}