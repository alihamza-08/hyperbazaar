import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
// import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <div className="mt-20" title={"All Categories"}>
      <div className="container mt-10">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
