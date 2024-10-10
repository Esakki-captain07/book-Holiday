import mongoose from '../router/index.js';
import tourModel from '../model/tourModel.js';

const getTourById = async (req, res) => {
    try {
        const { tourId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(400).send({
                message: 'Invalid Tour ID',
            });
        }

        const tour = await tourModel.findOne({ _id: tourId });

        if (tour) {
            res.status(200).send({
                message: 'Tour found successfully',
                data: tour,
            });
        } else {
            res.status(404).send({
                message: 'Tour not found',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
        });
    }
};

export default getTourById;
