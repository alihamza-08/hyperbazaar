import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { groceryContext } from '../Layout/Layout';
import { handleSessionStorage } from '../../utils/utils';

const StoreProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
      const getProductsByStoreId = async () => {
        try {
          const storeId = params.storeId;
    
          const { data } = await axios.post(
            `http://localhost:3000/api/v1/product/storefind/${storeId}/products`
          );
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
    

    if (params?.storeId) {
      getProductsByStoreId();
    }}
  }, [params?.storeId]);

  // Handle Add To Cart
  const handleAddToCartBtn = (product) => {
    if (product) {
      let targetedProduct = product;
      let latestCartItems = cartItems;

      const isTargetedProductAlreadyExist = cartItems.find(
        (item) => item.id === product.id
      );
      if (isTargetedProductAlreadyExist) {
        targetedProduct = {
          ...isTargetedProductAlreadyExist,
          quantity: isTargetedProductAlreadyExist.quantity + 1,
          total: (
            (isTargetedProductAlreadyExist.quantity + 1) *
            isTargetedProductAlreadyExist.price
          ).toFixed(2),
        };
        latestCartItems = cartItems.filter(
          (item) => item.id !== targetedProduct.id
        );
      }
      setCartItems([targetedProduct, ...latestCartItems]);
      handleSessionStorage("set", "cartItems", [
        targetedProduct,
        ...latestCartItems,
      ]);

      setOpenAlert(!openAlert);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="p-3 max-w-7xl m-auto">
          <div className="mt-6 sm:mt-10 p-12">
            <div>
              <h1 className="text-2xl font-medium font-poppins">
                Products Available
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
                {/* Render each product */}
                {products.map((product) => (
                  <div key={product._id} className="overflow-hidden rounded-xl">
                    <img
                      src={`http://localhost:3000/api/vi/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h1 className="text-3xl text-red-500 font-semibold sm:text-4xl ">
                          {product.name}
                        </h1>
                        <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                          {product.description}
                        </p>
                        <span className="text-xl text-green-500 font-semibold sm:text-2xl">
                          Price ${product.price}
                        </span>
                      </div>
                      <div className="w-full text-left my-4">
                        <button
                          className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                          title="Add to Cart"
                          onClick={() => handleAddToCartBtn(product)}
                        >
                          <span>Add to Cart</span>
                          <HiOutlineArrowCircleRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProduct;
