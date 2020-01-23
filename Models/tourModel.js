const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'A tour must have a name'],
        minlength :[10, 'Name must be more than 10 characters'],
        maxlength:[40, 'Name must be less than 40 characters'],
        unique : true
    },
    slug : String,
    duration :{
        type : Number,
        required : [true, 'A tour must have a durations']
    },

    difficulty :{
        type : String,
        required : [true, 'A tour must have a difficulty'],
        enum :{
            values : ['easy' , 'medium', 'difficult'],
            message : "Difficulty can be easy, medium or difficult"
        }
    },


    price : {
        type : Number,
        required : [true, 'A tour must have a price']
    },
    priceDiscount :
    {
        type : String,
        validate : {
            validator : function(val) {
                return val < this.price 
            },
            message : "Discount price ({VALUE}) should be less than price"
        }
    },

    ratingsQuantity :{
        type : Number,

    },
    ratingsAverage : {
        type : Number,
        default : 4.5,
        min : [1, 'Rating must be greater than 1'],
        max : [5, 'Rating must be less than 5']
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
    },
    secretTour : {
        type : Boolean,
        default : false,
    }

},
{
    toJSON : { virtuals : true},
    toObject : { virtuals : true}
})

//Document Middleware : before .save() and .create()
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower : true});
    next();
})

//Query Middleware : find()
tourSchema.pre(/^find/, function(next){
    this.find({ secretTour : {$ne : true}}) ;
    next(); 
})

tourSchema.post(/^find/, function(docs,next){
    console.log(docs);
    next();
})

// Agregation Middleware
tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({ $match : {secretTour : { $ne : true}}});
    console.log(this.pipeline());
    next();
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/ 7;
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;