import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Components/Pricec";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/api/vi/product/get-product");
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);


 
  return (
    <main className="mt-20">
      <div className="container row mt-3" style={{display:"flex"}}>
        <div className="col-md-12">
          <h1 className="text-center mb-10" style={{fontSize:"2.3rem", fontWeight:'bold'}}>All Products</h1>
          <div className="d-flex flex-wrap" style={{display:"flex", flexWrap:"wrap"}}>
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                    src={`http://localhost:3000/api/vi/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
           
            ))}
          </div>
     </div>
     </div>
    </main>
  );
};

export default HomePage;
