import mongoose from './index.js';

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Name is required']
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    mobile:{
        type:Number,
        required:[true,'Mobile Number is Required']
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tour',
        required: [true, 'Tour ID is required'],
    },
    bookingSeats: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('booking', bookingSchema);
