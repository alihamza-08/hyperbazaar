const categoryModel = require("../models/categoryModel.js");
const productModel = require("../models/productModel.js");
const fs = require("fs");
const slugify = require("slugify");
const storeModels = require("../models/storeModels.js");
const User = require("../models/user-models.js");


const createProductController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, price, originalPrice, category, quantity, shipping, userId, offerPrice , storeName} = req.fields;
    const { photo } = req.files;
  console.log(req.fields)
    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !originalPrice:
        return res.status(500).send({ error: "Original Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      // case photo && photo.size > 1000000:
      //   return res.status(500).send({ error: "Photo is Required and should be less than 1MB" });
    
      }

    const product = new productModel({
      name,
      description,
      price,
      originalPrice,
      category,
      quantity,
      shipping,
      slug: slugify(name),
      userId,
      storeName,
      offerPrice
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    const userIds = products.map(product => product.userId).filter(userId => userId);

    const stores = await storeModels.find({ retailer_id:  userIds  });


  
    const storeMap = new Map(stores.map(store => [store.retailer_id.toString(), store.storeName]));

    
    const productsWithStoreNames = products.map(product => ({
      ...product._doc,
      storeName: product.userId ? storeMap.get(product.userId.toString()) || null : null,
    }));

    res.status(200).json({
      success: true,
      totalCount: products.length,
      message: "All Products",
      products: productsWithStoreNames,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ success: false, message: "Failed to get products", error: error.message });
  }
};







// Controller function to get a single product by slug
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
      .populate("storeName");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.error("Error getting single product:", error);
    res.status(500).json({ success: false, message: "Failed to get single product", error: error.message });
  }
};

// Controller function to get product photo by ID
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (!product || !product.photo.data) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }

    res.set("Content-type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } catch (error) {
    console.error("Error getting product photo:", error);
    res.status(500).json({ success: false, message: "Failed to get product photo", error: error.message });
  }
};

// Controller function to delete a product by ID
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
  }
};

// Controller function to update a product by ID
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, originalPrice, offerPrice, category, quantity, shipping, userId, storeName } = req.body;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !originalPrice:
        return res.status(500).send({ error: "Original Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo is Required and should be less than 1MB" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        originalPrice,
        category,
        quantity,
        shipping,
        slug: slugify(name),
        userId,
        offerPrice
      },
      { new: true }
    );

    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    await updatedProduct.save();

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};
// Controller function to get products by category
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");

    res.status(200).json({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.error("Error getting products by category:", error);
    res.status(500).json({ success: false, message: "Failed to get products by category", error: error.message });
  }
};

// Controller function to get products by store ID
const getProductByStoreId = async (req, res) => {
  try {
    console.log(req.params);
    const { storeId } = req.params;
    const store = await storeModels.findById({ storeId: storeId });

    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }
     const userId=store.retailer_id;
    const products = await productModel.find({userId});
    console.log(products);
    res.status(200).json({
      success: true,
      message: "Products associated with the store",
      products,
    });
  } catch (error) {
    console.error("Error getting products by store ID:", error);
    res.status(500).json({ success: false, message: "Failed to get products by store ID", error: error.message });
  }
};

const createOfferController = async (req, res) => {
  try {
    const { productId, offerPrice, offerExpiryDate, userId } = req.body;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Retrieve the product based on the productId provided in the request body
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Save offer data along with user ID
    product.offerPrice = offerPrice;
    product.offerExpiryDate = offerExpiryDate;
    product.userId = userId; // Save the user ID

    await product.save();

    res.status(201).json({ success: true, message: "Offer created successfully", product });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ success: false, message: "Failed to create offer", error: error.message });
  }
};

// Controller function to get offer for a product
const getOfferForProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!product.offerPrice || !product.offerExpiryDate) {
      return res.status(404).json({ success: false, message: "No offer available for this product" });
    }

    res.status(200).json({
      success: true,
      message: "Offer found for product",
      offer: {
        offerPrice: product.offerPrice,
        offerExpiryDate: product.offerExpiryDate,
      },
    });
  } catch (error) {
    console.error("Error getting offer for product:", error);
    res.status(500).json({ success: false, message: "Failed to get offer for product", error: error.message });
  }
};


// Controller function to apply offer on a product
const applyOfferOnProductController = async (req, res) => {
  try {
    const { offerPrice, offerExpiryDate } = req.body;
    const product = await productModel.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    console.log(product)
    // Update product price with offer price
    product.price = offerPrice;
    product.offerPrice = offerPrice;
    product.offerExpiryDate = offerExpiryDate;

    await product.save();
     console.log("after",product)
    res.status(200).json({ success: true, message: "Offer applied successfully", product });
  } catch (error) {
    console.error("Error applying offer on product:", error);
    res.status(500).json({ success: false, message: "Failed to apply offer on product", error: error.message });
  }
};

// Controller function to remove offer on a product
const removeOfferOnProductController = async (req, res) => {
  try {
    console.log(req.params.productId)
    const product = await productModel.findById(req.params.productId);
 
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Reset product price to original price
    product.price = product.originalPrice;
    product.offerPrice = null;
    product.offerExpiryDate = null;

    await product.save();

    res.status(200).json({ success: true, message: "Offer removed successfully", product });
  } catch (error) {
    console.error("Error removing offer on product:", error);
    res.status(500).json({ success: false, message: "Failed to remove offer on product", error: error.message });
  }
};

const getProductsByUserIdController = async (req, res) => {

  try {
    const userId = req.params.userId;
    const products = await productModel.find({ userId });
    res.status(200).json({
      success: true,
      message: "Products created by the user",
      products,
    });
  } catch (error) {
    console.error("Error getting products by user:", error);
    res.status(500).json({ success: false, message: "Failed to get products by user", error: error.message });
  }
};


// Get all offers created by a specific user
const getOffersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const offers = await productModel.find({ userId }).populate('userId', 'name');
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error getting offers by user:', error);
    res.status(500).json({ success: false, message: 'Failed to get offers by user', error: error.message });
  }
};

// Update an offer (set offer fields to null)
const updateOffer = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { offerPrice } = req.body;
    const existingOffer = await productModel.findById(offerId);

    // Check if the offer exists
    if (!existingOffer) {
      return res.status(400).json({ success: false, message: 'Offer not found' });
    }

    // Check if the offer fields are already null
    if (existingOffer.offerPrice === null && existingOffer.offerExpiryDate === null) {
      return res.status(400).json({ success: false, message: 'There is no existing offer to update' });
    }

    // Update offerPrice if provided
    if (offerPrice !== undefined) {
      existingOffer.offerPrice = offerPrice;
    }

    await existingOffer.save();

    res.status(200).json({ success: true, message: 'Offer updated successfully' });
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ success: false, message: 'Failed to update offer', error: error.message });
  }
};

// Delete an offer (set offer fields to null)
const deleteOffer = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const existingOffer = await productModel.findById(offerId);

    // Check if the offer exists
    if (!existingOffer) {
      return res.status(400).json({ success: false, message: 'Offer not found' });
    }

    // Check if the offer fields are already null
    if (existingOffer.offerPrice === null && existingOffer.offerExpiryDate === null) {
      return res.status(400).json({ success: false, message: 'There is no existing offer to delete' });
    }

    // Set offer fields to null
    existingOffer.offerPrice = null;
    existingOffer.offerExpiryDate = null;
    await existingOffer.save();

    res.status(200).json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ success: false, message: 'Failed to delete offer', error: error.message });
  }
};


module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productCategoryController,
  getProductByStoreId,
  createOfferController,
  getOfferForProductController,
  applyOfferOnProductController,
  removeOfferOnProductController,
  getProductsByUserIdController,

  getOffersByUser,
  deleteOffer,
  updateOffer,
};



// /// second

// const categoryModel = require("../models/categoryModel.js");
// const productModel = require("../models/productModel.js");
// const fs = require("fs");
// const slugify = require("slugify");

// const createProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } = req.fields;
//     const { photo } = req.files;
//     const storeId = req.params.storeId; // Extract storeId from URL parameters

//     // Validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case photo && photo.size > 1000000:
//         return res.status(500).send({ error: "Photo is Required and should be less than 1mb" });
//     }

//     const products = new productModel({ ...req.fields, storeId, slug: slugify(name) });
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }

//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating product",
//     });
//   }
// };

// const getProductController = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({ storeId: req.params.storeId }) // Filter products by storeId
//       .populate("category")
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       countTotal: products.length,
//       message: "All Products",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in getting products",
//       error: error.message,
//     });
//   }
// };

// const getSingleProductController = async (req, res) => {
//   try {
//     const product = await productModel
//       .findOne({ slug: req.params.slug })
//       .select("-photo")
//       .populate("category");
//     res.status(200).send({
//       success: true,
//       message: "Single Product Fetched",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting single product",
//       error,
//     });
//   }
// };

// const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product.photo.data) {
//       res.set("Content-type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting photo",
//       error,
//     });
//   }
// };

// const deleteProductController = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.params.pid).select("-photo");
//     res.status(200).send({
//       success: true,
//       message: "Product Deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting product",
//       error,
//     });
//   }
// };

// const updateProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping, offer } = req.fields;
//     const { photo } = req.files;

//     // Validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case photo && photo.size > 1000000:
//         return res.status(500).send({ error: "Photo is Required and should be less than 1mb" });
//     }

//     const products = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Update product",
//     });
//   }
// };

// const productCategoryController = async (req, res) => {
//   try {
//     const category = await categoryModel.findOne({ slug: req.params.slug });
//     const products = await productModel.find({ category }).populate("category");
//     res.status(200).send({
//       success: true,
//       category,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       error,
//       message: "Error While Getting products",
//     });
//   }
// };

// const getProductByStoreId = async (req, res) => {
//   try {
//     // Retrieve storeId from request parameters
//     const { storeId } = req.params;

//     // Retrieve products associated with the specified storeId
//     const products = await productModel.find({ store: storeId });

//     res.status(200).send({
//       success: true,
//       message: "Products associated with the store",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while retrieving products",
//       error: error.message,
//     });
//   }
// };



// module.exports = {
//   createProductController,
//   getProductController,
//   getSingleProductController,
//   productPhotoController,
//   deleteProductController,
//   updateProductController,
//   productCategoryController,
//   getProductByStoreId
// };
