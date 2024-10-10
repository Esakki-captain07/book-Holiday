import bookingModel from "../model/bookingModel.js";
import tourModel from '../model/tourModel.js'
import mongoose from "../model/index.js";

const checkAvailability = async (tourId, requestedSeats) => {
    try {
        const tour = await tourModel.findOne({ _id: new mongoose.Types.ObjectId(tourId) });

        if (!tour) {
            throw new Error('Tour not found');
        }

        if (tour.availableSeats >= requestedSeats) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};


const createBooking = async (req, res) => {
    try {
        const { customerName, tourId , bookingSeats,mobile } = req.body;
        const userId = req.userId; 

        if (!mobile) {
            return res.status(400).send({
                message: "Mobile number is required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(400).send({
                message: "Invalid tourId format",
            });
        }

        if (await checkAvailability(tourId, bookingSeats)) {
            await bookingModel.create({
                customerName,
                userId: new mongoose.Types.ObjectId(userId), 
                tourId: new mongoose.Types.ObjectId(tourId),
                mobile,
                bookingSeats,
            });

            await tourModel.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(tourId) },
                { $inc: { availableSeats: -bookingSeats } }  
            );

            res.status(201).send({
                message: "Booking Created Successfully",
            });
        } else {
            res.status(400).send({
                message: "Not enough available seats for the selected tour",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
};


const getAllBookings = async (req, res) => {
    try {
        const { tourId } = req.query;
        if (tourId && !isValidObjectId(tourId)) {
            return res.status(400).send({
                message: 'Invalid tourId',
            });
        }

        const bookedStatus = await bookingModel.find().populate('tourId', 'name location startDate endDate');
        if (bookedStatus.length > 0) {
            res.status(200).send({
                message: 'Data fetched successfully',
                data: bookedStatus
            });
        } else {
            res.status(404).send({
                message: 'No bookings found',
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
        });
    }
};
const getBookingsByUserId = async (req, res) => {
    const userId = req.userId; 
    console.log(userId)

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({
                message: 'Invalid userId',
            });
        }

        const bookings = await bookingModel
            .find({ userId: new mongoose.Types.ObjectId(userId) }) 
            .populate({
                path: 'tourId',
                select: 'name location startDate endDate', 
            });

        if (bookings.length > 0) {
            res.status(200).send({
                message: 'Bookings fetched successfully',
                data: bookings,
            });
        } else {
            res.status(404).send({
                message: 'No bookings found for this user',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
        });
    }
};




export default {
    createBooking,
    getAllBookings,
    getBookingsByUserId
}