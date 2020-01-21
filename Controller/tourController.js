// const fs = require('fs');
const Tour = require('./../Models/tourModel');
const apiFeatures   = require('../utils/appFeatures.js');

exports.alias = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name, difficulty, price, ratingsAverage, summary';
    next();
}


// const tours = JSON.parse(fs.readFileSync(`../Myproject/tours-simple.json`));

// exports.checkID = (req, res, next, val) =>{
//     const id = req.params.id * 1;
//     const tour = tours.find(er => er.id === id);
//     console.log(tour);
//     if(!tour)
//     {
//        return res.status(404).json({
//             status : 'failed',
//             message : 'invalid id'
//         })
//     }
//     next();
// }

//checkBody middleware
// exports.checkBody = (req,res,next) =>{
    
//         if(!req.body.name || !req.body.price){

//         res.status(400).json({
//             status : 'fail',
//             message : "Missing name or price"
//         });
//     }
//     next();
// }

exports.getAlltours = async (req,res) =>{
    
    try{
        //no comments
        // const queryObj = {...req.query}
        // const removed = ['page', 'limit', 'fields', 'sort'];
        // removed.forEach((el => delete queryObj[el]));

        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));
        
        // let query =  Tour.find(JSON.parse(queryStr));
        // console.log(query);

        //Sort
        // if(req.query.sort)
        // {
        //     const sortedQuery = req.query.sort.split(',').join(' ');
        //     console.log(sortedQuery);
        //     query.sort(req.query.sort);
        // }
        // else
        // {
        //     query = query.sort('-createdAt')
        // }

        // Selecting Fields
        // if(req.query.fields)
        // {       
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // }
        // else{
        //     query = query.select('-__v');
        // }

        //Pagination
        
        // const page = req.query.page * 1 || 1;
        // console.log(page);
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;

        // query = query.skip(skip).limit(limit);

        // if(req.query.page)
        // {
        //     const totalTours = await Tour.countDocuments();
        //     if(skip >= totalTours) throw new Error("Page doesnot exist");   
        // }

        const features = new apiFeatures(Tour.find(), req.query).filter().sort().limitingFields().paginate();
        const Tours = await features.query;

       


        res.status(200).json({
            status : 'success',
            result : Tours.length,
            data : {
                Tours
            }
    
        });
    }
    catch(err)
    {
        res.status(404).json({
            status : 'fail',
            message : err.message
        })
    }
    
   
   
}

exports.getTour = async (req,res) => {
    
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    }
    catch(err)
    {
        res.status(404).json({
            status : 'fail',
            message : err.message
        })
    }
}
    

exports.createTour = async (req,res) =>{
    // console.log(req.body);
    try{
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status : 'success',
            data : {
                tours : newTour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status : 'fail',
            message : err.message
        })
    }
   
}


exports.updateTour =  async (req,res) =>{
    try{
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
    
        res.status(200).json({
            status : 'success',
            data :
            {
               updatedTour
            }
    
        })
    }
    catch(err)
    {
        res.status(400).json({
            status : 'fail',
            message : err.message
        })
    }   
}
    
    // const id = req.params.id * 1;
    // const tour = tours.find(er => er.id === id);

    // const updatedTour = { ...tour, ...req.body };
    // console.log("==============================")
    // console.log("Updated Tour", updatedTour);
    // console.log("==============================")
    // const updatedTours = tours.map(tour => tour.id === updatedTour.id ? updatedTour : tour);
    // console.log("==============================")
    // console.log("Updated Tours", updatedTours);
    // console.log("==============================")
    
    // console.log(updatedTour);

    // fs.writeFile(`../Myproject/tours-simple.json`,JSON.stringify(updatedTours), err =>{
       
    // })

    



exports.deleteTour = async (req,res) =>{
    try{
        await Tour.findByIdAndDelete(req.params.id, req.body);
        res.status(204).json({
        status : 'success',
        data : null

    })
    }
    catch(err)
    {
        res.status(400).json({
            status : 'fail',
            message : err.message
        })
    }
    // const id = req.params.id * 1;
    // const tour = tours.find(er => er.id === id);

    // const index = tours.indexOf(tour);
    // tours.splice(index, 1);
    // fs.writeFile(`../Myproject/tours-simple.json`,JSON.stringify(tours), err =>{
      
    // })
    

}

exports.getTourStats = async (req,res) => {

        try{
            
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
    }
        catch(err) {
            res.status(400).json({
                status : 'fail',
                message : err.message
            })
        }

}