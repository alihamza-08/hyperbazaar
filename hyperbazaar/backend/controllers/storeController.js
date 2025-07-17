
const storeModels = require("../models/storeModels.js");
const fs = require("fs");
const path = require("path"); 
const storeController = async (req, res) => {
    try {
        const { storeName, business_email, address, pin, latitude, longitude,retailer_id } = req.body;
        const image = req.file; // Get the uploaded image file
        
        // Ensure an image is uploaded
        if (!image) {
            return res.status(400).send({
                success: false,
                message: "Image upload is required",
            });
        }

        console.log('Request Body:', req.body);
        console.log('Uploaded Image:', image);

        // Create a new store model instance
        const store = new storeModels({
            storeName,
            business_email,
            address,
            pin,
            location: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            // Assuming the image path will be stored in the database
            imagePath: image.path ,
            retailer_id
        });

        // Save the store to the database
        await store.save();
        
        console.log(store);
        res.status(201).send({
            success: true,
            message: "Store is created",
            store,
            imageUrl: image.path, // Provide the image URL in the response
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in store",
        });
    }
};

const findStoreController = async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    try {
        const store_data = await storeModels.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [longitude, latitude]
                },
                distanceField: "dist.calculated",
                spherical: true
              }
            },
            {
              $match: {
                "dist.calculated": { $lte: parseFloat(10) * 1609 }
              }
            }
          ]);
        
        
        res.status(200).send({
            success: true,
            message: "Store details",
            data: store_data
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// Function to get image by ID
const getImage = async (req, res) => {
    try {
      const imageId = req.params.id;
      const image = await storeModels.findById(imageId);
      if (!image) {
        return res.status(404).json({ message: 'image not found' });
      }
      // Check if image path exists
      if (!fs.existsSync(image.imagePath)) {
        return res.status(404).json({ message: 'Image not found' });
      }
      // Set content type as image/jpeg or image/png depending on file extension
      const contentType = image.imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
      res.set('Content-Type', contentType);
      // Send image file
      res.sendFile(path.resolve(image.imagePath));
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  module.exports = { storeController, findStoreController, getImage };

// ///second
// // controllers/storeController.js
// const storeModels = require("../models/storeModels");
// const User = require("../models/user-models")
// const fs = require("fs");
// const path = require("path");

// // Create store controller
// const storeController = async (req, res) => {
//     try {
//         // Get user ID from the request
//         const userData = await User.findOne({_id:req.body.retailer_id})
//          if(userData)
//        {

//        }

//         const { storeName, business_email, address, pin, latitude, longitude } = req.body;
//         const image = req.file; // Get the uploaded image file
        
//         // Ensure an image is uploaded
//         if (!image) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Image upload is required",
//             });
//         }

//         // Create a new store model instance
//         const store = new storeModels({
//             storeName,
//             business_email,
//             address,
//             pin,
//             location: {
//                 type: "Point",
//                 coordinates: [parseFloat(longitude), parseFloat(latitude)]
//             },
//             // Assuming the image path will be stored in the database
//             imagePath: image.path,
//             user: userId // Associate the store with the logged-in user
//         });

//         // Save the store to the database
//         await store.save();
        
//         res.status(201).send({
//             success: true,
//             message: "Store is created",
//             store,
//             imageUrl: image.path, // Provide the image URL in the response
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in store",
//         });
//     }
// };

// // Find store controller
// const findStoreController = async (req, res) => {
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;

//     try {
//         const store_data = await storeModels.aggregate([
//             {
//                 $geoNear: {
//                     near: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
//                     key: "location",
//                     maxDistance: parseFloat(10) * 1609,
//                     distanceField: "dist.calculated",
//                     spherical: true
//                 }
//             }
//         ]);
        
//         res.status(200).send({
//             success: true,
//             message: "Store details",
//             data: store_data
//         });
//     } catch (error) {
//         res.status(400).send({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // Function to get image by ID
// const getImageController = async (req, res) => {
//     try {
//       const imageId = req.params.id;
//       const image = await storeModels.findById(imageId);
//       if (!image) {
//         return res.status(404).json({ message: 'image not found' });
//       }
//       // Check if image path exists
//       if (!fs.existsSync(image.imagePath)) {
//         return res.status(404).json({ message: 'Image not found' });
//       }
//       // Set content type as image/jpeg or image/png depending on file extension
//       const contentType = image.imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
//       res.set('Content-Type', contentType);
//       // Send image file
//       res.sendFile(path.resolve(image.imagePath));
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = { storeController, findStoreController, getImageController };
