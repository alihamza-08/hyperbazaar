import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
    //   const { data } = await axios.get(`http://localhost:3000/api/v1/product/product-category/${params.slug}`);
      const { data } = await axios.get(`http://localhost:3000/api/vi/product//product-category/${params.slug}`);
       console.log(data.products)
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(category)

  return (
    <div className="container" style={{margin:"0 auto"}}>
      <div className="container mt-20">
        <img src={category.img} alt="" />
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row" >
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap" style={{display:"flex", flexWrap:"wrap"}}>
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    //  src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                     src={`http://localhost:3000/api/vi/product//product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">price $ {p.price}</p>
                    <button
                      className="btn btn-light ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-light ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
