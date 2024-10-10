import tourModel from "../model/tourModel.js";
import {randomString} from '../common/helper.js'
import mongoose from "../model/index.js";

const createProgram = async (req, res) => {
    try {
        let program = await tourModel.findOne({ name: req.body.name });

        if (!program) {
            let newTourId;
            let isUnique = false;

            while (!isUnique) {
                newTourId = randomString(8);
                const existingTour = await tourModel.findOne({ tourId: newTourId });
                isUnique = !existingTour;
            }

            req.body.tourId = newTourId; 

            await tourModel.create(req.body);

            res.status(201).send({
                message: 'Program created successfully',
            });
        } else {
            res.status(400).send({
                message: 'A program with this name already exists',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || 'Internal Server Error',
        });
    }
};


const getAllPrograms = async(req,res)=>{
    try {

        let programs = await tourModel.find()
        res.status(200).send({
            message:'data fetched successfull',
            data:programs
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
       })
    }
}


const topRatedPlace = async(req,res)=>{
    try {
        const ratedPlaces = await tourModel.find().sort({rating:-1}).limit(3)
        if(ratedPlaces){
            res.status(200).send({
                message:'data fethed successfully',
                data:ratedPlaces
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       })
    }
}


const upCommingProgram = async(req,res)=>{
    try {
        const upCommingPlans = await tourModel.find({upComming:true}).limit(3)
        if(upCommingPlans){
            res.status(200).send({
                message:'data fethed successfully',
                data:upCommingPlans
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       }) 
    }
}

const countryViseData = async (req, res) => {
    try {
        const { country } = req.query; 
        
        const countryDetails = await tourModel.find({ country: { $regex: new RegExp(country, "i") } }).limit(3)

        if (countryDetails.length > 0) {
            res.status(200).send({
                message: 'Data fetched successfully',
                data: countryDetails
            });
        } else {
            res.status(404).send({
                message: `No places found for ${country}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};



const viewTourById = async (req, res) => {
    try {
        const { tourId } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(400).send({
                message: "Invalid tourId format",
            });
        }

        console.log('Received tourId:', tourId);

        const tour = await tourModel.findById(tourId);

        if (!tour) {
            return res.status(404).send({
                message: "Tour not found",
            });
        }

        res.status(200).send({
            message: "Tour fetched successfully",
            data: tour,
        });
    } catch (error) {
        console.error('Error in viewTourById:', error); 
        return res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
};

const fetchBeach = async(req,res)=>{
    try {
        const beachPlans = await tourModel.find({beach:true})
        if(beachPlans){
            res.status(200).send({
                message:'data fethed successfully',
                data:beachPlans
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       }) 
    }
}

const fetchHills = async(req,res)=>{
    try {
        const hillsPlans = await tourModel.find({hills:true})
        if(hillsPlans){
            res.status(200).send({
                message:'data fethed successfully',
                data:hillsPlans
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       }) 
    }
}

const fetchAdventure = async(req,res)=>{
    try {
        const adventurePlans = await tourModel.find({adventure:true})
        if(adventurePlans){
            res.status(200).send({
                message:'data fethed successfully',
                data:adventurePlans
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       }) 
    }
}

const fetchReligeos = async(req,res)=>{
    try {
        const religeosPlans = await tourModel.find({religeos:true})
        if(religeosPlans){
            res.status(200).send({
                message:'data fethed successfully',
                data:religeosPlans
            })
        }else{
            res.status(400).send({
                message:'no recent places'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
       }) 
    }
}


    const fetchHeritage = async(req,res)=>{
        try {
            const heritagePlans = await tourModel.find({heritage:true})
            if(heritagePlans){
                res.status(200).send({
                    message:'data fethed successfully',
                    data:heritagePlans
                })
            }else{
                res.status(400).send({
                    message:'no recent places'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:error.message || "Internal Server Error"
           }) 
        }
    }

    const topHoneymoonPackages = async (req, res) => {
        try {
            const honeymoonPackages = await tourModel.find({
                country: 'india',
                upComming: false, 
                isActive: 'active' 
            }).sort({ rating: -1 }).limit(5);
    
            if (honeymoonPackages.length > 0) {
                res.status(200).json({
                    message: 'Top honeymoon packages found',
                    data: honeymoonPackages,
                });
            } else {
                res.status(404).json({
                    message: 'No honeymoon packages found',
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'Internal Server Error',
            });
        }
    };
    

export default{
    createProgram,
    getAllPrograms,
    topRatedPlace,
    upCommingProgram,
    viewTourById,
    countryViseData,
    fetchBeach,
    fetchAdventure,
    fetchHeritage,
    fetchHills,
    fetchReligeos,
    topHoneymoonPackages
}