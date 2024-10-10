import mongoose from './index.js';


const tourSchema = new mongoose.Schema({
    tourId: { 
        type: String,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'decription is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
   
    rating:{
        type:Number,
        required:true
    },
    startDate:{
        type: String,
       required:true
    },
    endDate:{
        type:String,
        required:true
    },
    honeymoonPackages:{
        type:Boolean,
    },
    availableSeats:{
        type: Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    beach:{
        type:Boolean
    },
    hills:{
        type:Boolean
    },
    adventure:{
        type:Boolean
    },
    religeos:{
        type:Boolean
    }, 
    heritage:{
        type:Boolean
    },
    location:{
        type:String,
        required:true
    },
    upComming:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:true
    },
    isActive:{
        type:String,
        enum:['active','inActive'],
        default:'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    collection: 'tour',
    versionKey: false
});

const tourModel = mongoose.model('tour', tourSchema);

export default tourModel;