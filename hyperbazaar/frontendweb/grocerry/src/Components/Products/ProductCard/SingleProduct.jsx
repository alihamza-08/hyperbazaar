import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";


import SuccessAlert from "../../SuccessAlert/SuccessAlert";
import { useNavigate } from "react-router-dom";
import { groceryContext } from "../../Layout/Layout";
import { handleSessionStorage } from "../../../utils/utils";

const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  const [offerApplied, setOfferApplied] = useState(false);


  useEffect(() => {
    getProduct(params?.slug);
  }, [params?.slug]);

  const getProduct = async (slug) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/vi/product/get-product/${slug}`);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleApplyOffer = async () => {
    try {
      const { offerPrice, offerExpiryDate } = product;
      const productId = product._id;

      const { data } = await axios.put(`http://localhost:3000/api/vi/product/apply-offer/${productId}`, {
        offerPrice,
        offerExpiryDate,
      });

      console.log("Offer applied successfully:", data);

      setProduct((prevProduct) => ({
        ...prevProduct,
        price: data.product.offerPrice,
        offerPrice: data.product.offerPrice,
        offerExpiryDate: data.product.offerExpiryDate,
      }));

      setOfferApplied(true);
    } catch (error) {
      console.error("Error applying offer:", error);
    }
  };

  const handleRemoveOffer = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/vi/product/remove-offer/${product._id}`);
      console.log("Offer removed successfully:", data);

      setProduct((prevProduct) => ({
        ...prevProduct,
        price: data.product.originalPrice,
      }));
      setOfferApplied(false);
    } catch (error) {
      console.error("Error removing offer:", error);
    }
  };

  const [openAlert, setOpenAlert] = useState(false)
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  //Handle Add To Cart
  const handleAddToCartBtn = () => {
      let targetedProduct = product;
      let latestCartItems = cartItems;
      console.log(product)
      console.log(product._id)
      const isTargetedProductAlreadyExist = cartItems.find(item => item.id === product._id)
      if (isTargetedProductAlreadyExist) {
          targetedProduct = {
              ...isTargetedProductAlreadyExist,
              quantity: isTargetedProductAlreadyExist.quantity + 1,
              total: ((isTargetedProductAlreadyExist.quantity + 1) * isTargetedProductAlreadyExist.price).toFixed(2)
          }
          latestCartItems = cartItems.filter(item => item.id !== targetedProduct.id)
      }
      setCartItems([
          targetedProduct,
          ...latestCartItems
      ])
      handleSessionStorage('set', 'cartItems', [
          targetedProduct,
          ...latestCartItems
      ])
       alert("Itme add to cart")
      setOpenAlert(!openAlert)
  }

  return (
    <div>
      {product && (
        <div className="p-3 max-w-7xl m-auto">
          <div className="mt-6 sm:mt-10 p-12">
            <div>
              <h1 className="text-2xl font-medium font-poppins">Product Details</h1>
              <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
                <div className="overflow-hidden rounded-xl">
                  <img src={`http://localhost:3000/api/vi/product/product-photo/${product._id}`} className="w-full" alt={product.name} />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl text-red-500 font-semibold sm:text-4xl">{product.name}</h1>
                    <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">{product.description}</p>
                    <span className="text-xl text-green-500 font-semibold sm:text-2xl">Price ${product.price}</span>
                  </div>
                  <div className=" ">
                    <div className="text-left flex flex-col gap-2 w-full"></div>
                    <div className="w-full text-left my-4">
                      <button className="flex justify-center items-center gap-2 w-full py-3 px-4 text-white text-md font-bold border border-green-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white  lg:m-0 md:px-6" title="Add to Cart" onClick={handleAddToCartBtn} style={{ background: "green" }}>
                        <span style={{ border: "none" }}>Add to Cart</span>
                        <HiOutlineArrowCircleRight />
                      </button>
                      <div className="dropdown dropdown-hover" style={{ display: "block", margin: "1rem 0rem 0rem 0rem" }}>
                        <div tabIndex={0} role="button" className="btn m-1" style={{ width: "100%", background: "#055205f0", color: "white", fontSize: "1.3rem" }}>
                          Offer
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" style={{ width: "100%", background: "#185810", color: "white", display: "flex", flexDirection: "column" }}>
                          {product.offerPrice ? (
                            <>
                              <li style={{ fontSize: "1.1rem" }}>Offer Price: ${product.offerPrice}</li>
                              <li style={{ fontSize: "1.1rem" }}>Offer Expiry Date: {product.offerExpiryDate}</li>
                            </>
                          ) : (
                            <li>No offer available</li>
                          )}
                          {offerApplied ? (
                            <li>
                              <button className="btn btn-sm btn-primary mt-2 " style={{ color: "white" }} onClick={handleRemoveOffer}>
                                Remove Offer
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button className="btn btn-sm btn-primary mt-2" onClick={handleApplyOffer}>
                                Apply Offer
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
