import { Container, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard, { ProductCardSkeleton } from './ProductCard/ProductCard';

const AllProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/vi/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Get all products
    const getAllProducts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("http://localhost:3000/api/vi/product/get-product");
            console.log(data);
            setIsLoading(false);
            setProducts(data.products);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Group products by store name
    const groupedProducts = products.reduce((acc, product) => {
        const storeName = product.storeName;
        if (!acc[storeName]) {
            acc[storeName] = [];
        }
        acc[storeName].push(product);
        return acc;
    }, {});

    return (
        <main className='min-h-screen space-y-5 pt-20 mb-9'>
            <Fade in={true}>
                <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
                    {isLoading ? (
                        Array.from({ length: 2 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : (
                        Object.keys(groupedProducts).map(storeName => (
                            <div key={storeName}>
                                {/* Store Name Heading */}
                                <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
                                    {storeName}
                                </h1>
                                
                                {/* Product Cards */}
                                <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
                                    {groupedProducts[storeName].map(product => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </section>
                            </div>
                        ))
                    )}
                </Container>
            </Fade>
        </main>
    );
};

export default AllProduct;
