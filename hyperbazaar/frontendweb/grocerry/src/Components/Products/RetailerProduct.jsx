// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Card, CardActions, CardContent, CardMedia, Fade, IconButton, Typography } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';

// const RetailerProducts = () => {
//     const [userProducts, setUserProducts] = useState([]);
//     const userId = localStorage.getItem('userId'); // Get user ID from local storage
//     console.log(userId)
//     // Function to fetch user's products
//     const fetchUserProducts = async () => {
//         try {
//             // Make API call to fetch user's products
//             const response = await axios.get(`http://localhost:3000/api/vi/product/${userId}`);
//             setUserProducts(response.data.products);
//         } catch (error) {
//             console.error('Error fetching user products:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUserProducts();
//     }, []); // Fetch products on component mount

//     // Function to delete a product
//     const handleDelete = async (productId) => {
//         try {
//             // Make API call to delete product
//             await axios.delete(`http://localhost:3000/api/v1/products/${productId}`);
//             // Remove deleted product from state
//             setUserProducts(userProducts.filter(product => product._id !== productId));
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     // Function to navigate to edit product page
//     const handleEdit = (productId) => {
//         // Navigate to edit product page with productId
//     };

//     return (
//         <Fade in={true}>
            
//             <div className="user-products-container" style={{
//                 display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop:"5rem",
//     gap:"2rem",
//     padding:"2rem"
//     }}>
//                 {userProducts.map(product => (
//                     <Card key={product._id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
//                         <CardMedia
//                             component="img"
//                             height="300"
//                             src={`http://localhost:3000/api/vi/product/product-photo/${product._id}`}
//                             // Replace with actual image URL
//                             alt={product.name}
//                         />
//                         <CardContent>
//                             <Typography gutterBottom variant="h5" component="div">
//                                 {product.name}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 {product.description}
//                             </Typography>
//                         </CardContent>
//                         <CardActions>
//                             <IconButton onClick={() => handleDelete(product._id)}>
//                                 <Delete />
//                             </IconButton>
//                             <IconButton onClick={() => handleEdit(product._id)}>
//                                 <Edit />
//                             </IconButton>
//                         </CardActions>
//                     </Card>
//                 ))}
//             </div>
//         </Fade>
//     );
// };

// export default RetailerProducts;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { toast } from 'react-toastify';
import CreateOfferModal from './CreateOfferModel';

const RetailerProducts = () => {
    const [userProducts, setUserProducts] = useState([]);
    const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const userId = localStorage.getItem('userId'); // Get user ID from local storage

    // Function to fetch user's products
    const fetchUserProducts = async () => {
        try {
            // Make API call to fetch user's products
            const response = await axios.get(`http://localhost:3000/api/vi/product/${userId}`);
            setUserProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching user products:', error);
        }
    };

    useEffect(() => {
        fetchUserProducts();
    }, []); // Fetch products on component mount

    // Function to delete a product
    const handleDelete = async (productId) => {
        try {
            // Make API call to delete product
            await axios.delete(`http://localhost:3000/api/v1/product/${productId}`);
            // Remove deleted product from state
            setUserProducts(userProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Function to open create offer modal
    const handleOpenCreateOfferModal = (product) => {
        setSelectedProduct(product);
        setCreateOfferModalOpen(true);
    };

    // Function to close create offer modal
    const handleCloseCreateOfferModal = () => {
        setSelectedProduct(null);
        setCreateOfferModalOpen(false);
    };

    // Function to handle success after creating offer
    const handleCreateOfferSuccess = () => {
        fetchUserProducts(); // Update product list after offer creation
        handleCloseCreateOfferModal(); // Close create offer modal
        toast.success('Offer created successfully'); // Display toast notification
    };

    return (
        <div className="user-products-container" style={{
            display: "flex",
            flexWrap: "wrap",  // Enable wrapping
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
            gap: "2rem",
            padding: "2rem"
          }}>
            {userProducts.map(product => (
                <Card key={product._id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
                    <CardMedia
                        component="img"
                        height="300"
                        src={`http://localhost:3000/api/vi/product/product-photo/${product._id}`}
                        alt={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => handleDelete(product._id)}>
                            <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleOpenCreateOfferModal(product)}>
                            <Add />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
            <CreateOfferModal
                open={createOfferModalOpen}
                onClose={handleCloseCreateOfferModal}
                onSuccess={handleCreateOfferSuccess}
                productId={selectedProduct ? selectedProduct._id : null}
            />
        </div>
    );
};

export default RetailerProducts;
