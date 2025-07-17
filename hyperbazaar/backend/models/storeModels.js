const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    retailer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    storeName: {
        type: String,
        required: true
    },
    business_email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        // required: true
    },
    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number], // Define coordinates as an array of Numbers
            required: true
        }
    },
    imagePath: {
        type: String, 
        required: true 
    },

});

storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Store", storeSchema);
