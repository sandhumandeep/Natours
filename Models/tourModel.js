const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'A tour must have a name'],
        unique : true
    },
    duration :{
        type : Number,
        required : [true, 'A tour must have a durations']
    },

    difficulty :{
        type : String,
        required : [true, 'A tour must have a difficulty']
    },


    price : {
        type : Number,
        required : [true, 'A tour must have a price']
    },

    ratingsQuantity :{
        type : Number,

    },
    ratingsAverage : {
        type : Number,
    },
    summary :{
        type : String,
        trim : true,
        required : [true, 'A tour must have a summary']
    },
    description :{
        type : String,
        trim : true,
        required : [true, 'A tour must have a description']
    },
    imageCover : {
        type : String,
        required : [true, 'A tour must have a cover image']
    },
    images :[String],
    startDates : [Date],
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;