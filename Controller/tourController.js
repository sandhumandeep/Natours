// const fs = require('fs');
const Tour = require('./../Models/tourModel');
const apiFeatures   = require('../utils/appFeatures.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.alias = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name, difficulty, price, ratingsAverage, summary';
    next();
}



exports.getAlltours = catchAsync(async (req,res,next) =>{
    
        const features = new apiFeatures(Tour.find(), req.query).filter().sort().limitingFields().paginate();
        const Tours = await features.query;

       


        res.status(200).json({
            status : 'success',
            result : Tours.length,
            data : {
                Tours
            }
    
        });
    });

exports.getTour = catchAsync(async (req,res,next) => {
    
        const tour = await Tour.findById(req.params.id);

        if(!tour){
            return next(new AppError('No Tour find with this ID'), 404)
        }
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    });
    

exports.createTour = catchAsync(async (req,res,next) =>{
    // console.log(req.body);

        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status : 'success',
            data : {
                tours : newTour
            }
        })
    });
   



exports.updateTour =  catchAsync(async (req,res,next) =>{
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
        if(!updatedTour){
            return next(new AppError('No Tour find with this ID'), 404)
        }
    
        res.status(200).json({
            status : 'success',
            data :
            {
               updatedTour
            }
    
        })
    });
    
    



exports.deleteTour = catchAsync(async (req,res,next) =>{
        const tour =await Tour.findByIdAndDelete(req.params.id, req.body);
        if(!tour){
            return next(new AppError('No Tour find with this ID'), 404)
        }

        res.status(204).json({
        status : 'success',
        data : null

    })
})

exports.getTourStats = catchAsync(async (req,res,next) => {

        
            
            const stats = await Tour.aggregate([
                {
                    $match : { ratingsAverage : {$gte : 4.0} }
                },
                {
                    $group: {
                        _id : '$difficulty',
                        numTours : {$sum : 1},
                        numRating : {$sum: '$ratingsQuantity'},
                        avgRating : { $avg : '$ratingsAverage'},
                        avgPrice : { $avg : '$price' },
                        minPrice : { $min : '$price'},
                        maxPrice : {$max : '$price'}

                    }
                },
                {
                    $sort : {
                        avgPrice : 1
                    }
                }

            ])
            res.status(200).json({
                status : 'success',
                data : stats

        })
    })
      