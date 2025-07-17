import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const ProductManagement = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState(""); // New state for original price
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [offer, setOffer] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/vi/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem("userId");
      console.log(userId);
      
      // Validate form data
      if (!category) {
        toast.error("Please select a category");
        return;
      }
      
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("originalPrice", originalPrice); // Append original price to form data
      productData.append("offerPrice", offer); // Change offerPrice to offer
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("userId", userId); // Include user ID in the form data

      // Log form data
      console.log({
        name,
        description,
        price,
        originalPrice,
        offer, // Change offerPrice to offer
        quantity,
        category,
        userId
      });

      const { data } = await axios.post(`http://localhost:3000/api/vi/product/create-product`, productData);
      if (data?.success) {
        setName("");
        setDescription("");
        setPrice("");
        setOriginalPrice(""); // Reset original price
        setQuantity("");
        setPhoto("");
        setOffer(""); // Reset offer
        setCategory("");
        setShipping("");
        toast.success(data?.message);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main title={"Dashboard - Create Product"}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="container m-3 p-3">
        <div className="">
          <div className="col-md-12">
            <h1 style={{fontSize:"2rem", fontWeight:"500", marginBottom:"2rem"}}>Create Product</h1>
            <div className="m-1 w-100">
              <Select
                bordered={true}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                style={{width:"50%"}}
              >
                {categories.map(category => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>
              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>

              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>

              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <input
                  type="number"
                  value={originalPrice}
                  placeholder="Write an original price"
                  className="form-control"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>

              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>

              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <input
                  type="number"
                  value={offer}
                  placeholder="Write an offer that you give for this product"
                  className="form-control"
                  onChange={(e) => setOffer(e.target.value)}
                  style={{width:"100%"}}
                />
              </div>
              <div className="mb-3" style={{width:"50%",fontSize:"1.1rem", padding:"0.3rem"}}>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  style={{width:"50%"}}
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductManagement;
