import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateOfferModal = ({ open, onClose, onSuccess, productId }) => {
    const [offerPrice, setOfferPrice] = useState('');
    const [offerExpiryDate, setOfferExpiryDate] = useState('');

    const handleSubmit = async () => {
        try {
            // Retrieve user ID from local storage
            const userId = localStorage.getItem('userId');
            console.log(userId)
            if (!userId) {
                // Handle case where user ID is not found in local storage
                toast.error('User ID not found. Please log in again.');
                return;
            }
            console.log(productId)
            const response = await axios.post('http://localhost:3000/api/vi/product/create-offer', {
                productId,
                offerPrice,
                offerExpiryDate,
                userId // Include user ID in the request
            });
            if (response.data.success) {
                toast.success(response.data.message);
                onSuccess();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error creating offer:', error);
            toast.error('Failed to create offer. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="create-offer-dialog-title">
            <DialogTitle id="create-offer-dialog-title">Create Offer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="offer-price"
                    label="Offer Price"
                    type="number"
                    fullWidth
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="expiry-date"
                    label="Offer Expiry Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={offerExpiryDate}
                    onChange={(e) => setOfferExpiryDate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Create Offer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateOfferModal;
