


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [updateOfferId, setUpdateOfferId] = useState('');
    const [updateOfferPrice, setUpdateOfferPrice] = useState('');
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const userId = localStorage.getItem('userId');
                console.log(userId)
                if (userId) {
                    const response = await axios.get(`http://localhost:3000/api/vi/product/user/${userId}`);
                    // console.log(response.ok)
                    setOffers(response.data);
                }
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers();
    }, []);

    const handleDeleteOffer = async (offerId) => {
        try {
            await axios.delete(`http://localhost:3000/api/vi/product/${offerId}`);
            const updatedOffers = offers.filter(offer => offer._id !== offerId);
            setOffers(updatedOffers);
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    const handleUpdateOffer = async () => {
        try {
            await axios.put(`http://localhost:3000/api/vi/product/apply-offer`, { offerPrice: updateOfferPrice,productId:updateOfferId });
            setOpenUpdateDialog(false);
            // Fetch updated offers after successful update
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const response = await axios.get(`http://localhost:3000/api/vi/product/user/${storedUserId}`);
                setOffers(response.data);
            }
        } catch (error) {
            console.error('Error updating offer:', error);
        }
    };

    const handleOpenUpdateDialog = (offerId, offerPrice) => {
        setUpdateOfferId(offerId);
        setUpdateOfferPrice(offerPrice);
        setOpenUpdateDialog(true);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexDirection:'column' }}>
            <h1 style={{ textAlign: 'center', fontSize:"2rem" }}>Offer List</h1>
            <div style={{ display:"flex", flexWrap:'wrap', gap:"1rem" , padding:"2rem" }}>
                {offers.length > 0 ? (
                    offers.map((offer) => (
                        <Card key={offer._id} style={{ marginBottom: '10px',display:'flex', flexWrap:"wrap", gap:"1rem"  }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Product Name:  {offer.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Original Price: {offer.originalPrice}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Offer Price: {offer.offerPrice}
                                </Typography>
                                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                                    <Button onClick={() => handleDeleteOffer(offer._id)} color="error">Delete</Button>
                                    <Button onClick={() => handleOpenUpdateDialog(offer._id, offer.offerPrice)} color="primary">Update</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" component="div" style={{ textAlign: 'center' }}>
                        No offers available
                    </Typography>
                )}

                {/* Update Offer Dialog */}
                <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                    <DialogTitle>Update Offer Price</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="offer-price"
                            label="Offer Price"
                            type="number"
                            fullWidth
                            value={updateOfferPrice}
                            onChange={(e) => setUpdateOfferPrice(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdateDialog} color="secondary">Cancel</Button>
                        <Button onClick={handleUpdateOffer} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default OfferList;
