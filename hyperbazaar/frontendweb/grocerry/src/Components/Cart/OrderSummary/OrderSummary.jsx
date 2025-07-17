import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import { groceryContext } from '../../Layout/Layout';
import { checkoutContext } from '../Cart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderSummary = () => {
    // Get Cart Items from Context
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems] = cartItemsState;
    const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [debitCardDetails, setDebitCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
    const [bidAmount, setBidAmount] = useState('');
    const [isBidSubmitted, setIsBidSubmitted] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('delivery'); // Default to delivery
    const [availablePaymentMethods, setAvailablePaymentMethods] = useState(['Cash on Delivery']);
    const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price

    // Media Query
    const isMediumScreen = useMediaQuery('(max-width:1024px)');

    // Delivery charge constant
    const deliveryCharge = 6; // Assuming a static delivery charge

    useEffect(() => {
        // Update available payment methods based on delivery option chosen
        if (deliveryOption === 'delivery') {
            setAvailablePaymentMethods(['Cash on Delivery', 'Debit Card']);
        } else {
            setAvailablePaymentMethods(['Cash on Pickup']);
        }
    }, [deliveryOption]);

    useEffect(() => {
        // Calculate total price whenever cart items or bid submission status changes
        calculateTotalPrice();
    }, [cartItems, isBidSubmitted]);

    const calculateTotalPrice = () => {
        // Calculate subtotal
        const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        let newTotalPrice = subtotal + deliveryCharge;

        // Adjust total price if bid was submitted and approved
        if (isBidSubmitted && bidAmount !== '') {
            newTotalPrice = parseFloat(bidAmount); // Use bid amount as the new total price
        }

        // Update state with the new total price
        setTotalPrice(newTotalPrice);
    };

    const handleProceedToCheckout = async () => {
        try {
            // Prepare order data
            const orderData = {
                orderItems: cartItems.map(item => ({
                    productId: item._id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.quantity * item.price
                })),
                total: totalPrice, // Use the calculated total price
                paymentMethod: paymentMethod,
                debitCardDetails: paymentMethod === 'Debit Card' ? debitCardDetails : null,
                bidAmount: isBidSubmitted ? bidAmount : null, // Include bid amount if submitted
                deliveryOption: deliveryOption // Include delivery option in order data
            };

            // Send order data to backend (assuming backend endpoint is available)
            const response = await axios.post('http://localhost:3000/api/vi/order/create-order', orderData);
            console.log('Order created:', response.data);

            // Proceed to checkout
            setIsProceedToCheckout(true);
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to create order. Please try again.');
        }
    };

    const handleBidSubmit = async () => {
        try {
            // Send bid amount to backend
            const response = await axios.post('http://localhost:3000/api/vi/bid/bidscreate', {
                bidAmount: bidAmount
            });
            console.log('Bid submitted:', response.data);
            setIsBidSubmitted(true); // Mark bid as submitted on success
        } catch (error) {
            console.error('Error submitting bid:', error);
            toast.error('Failed to submit bid. Please try again.');
        }
    };

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDebitCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setDebitCardDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1'>
            <div className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}>
                {/* Title */}
                <h3 className='lg:text-xl text-lg sm:font-semibold font-bold tracking-wide'>Order Summary</h3>

                {/* Total Bill */}
                <table className='table-auto h-28 text-sm w-full'>
                    <tbody>
                        {/* Subtotal */}
                        <tr className='font-medium lg:text-gray-800 text-gray-600'>
                            <td>Subtotal</td>
                            <td>{cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)} PKR</td>
                        </tr>
                        {/* Delivery Charge */}
                        <tr className='font-medium text-sm lg:text-gray-800 text-gray-600'>
                            <td>Delivery charge</td>
                            <td>{deliveryCharge} PKR</td>
                        </tr>
                        {/* Total */}
                        <tr className='lg:font-medium font-semibold lg:text-lg'>
                            <td>Total</td>
                            <td style={{ color: 'green' }}>{totalPrice.toFixed(2)} PKR</td>
                        </tr>
                    </tbody>
                </table>

                {/* Bidding System */}
                {totalPrice > 1000 && !isBidSubmitted && (
                    <div>
                        <p>Your cart exceeds a certain limit. Place a bid:</p>
                        <TextField
                            fullWidth
                            label="Bid Amount"
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <Button onClick={handleBidSubmit} variant="contained" color="primary">
                            Submit Bid
                        </Button>
                    </div>
                )}
                {isBidSubmitted && <p>Bid submitted. Waiting for response...</p>}

                {/* Delivery or Pickup */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Delivery Option</FormLabel>
                    <RadioGroup aria-label="delivery-option" name="delivery-option" value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                        <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                        <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                    </RadioGroup>
                </FormControl>

                {/* Payment method selection */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Method</FormLabel>
                    <RadioGroup aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handlePaymentChange}>
                        {availablePaymentMethods.map(method => (
                            <FormControlLabel key={method} value={method} control={<Radio />} label={method} />
                        ))}
                    </RadioGroup>
                </FormControl>

                {/* Debit Card details */}
                {paymentMethod === 'Debit Card' && (
                    <div>
                        <TextField
                            fullWidth
                            label="Card Number"
                            name="cardNumber"
                            value={debitCardDetails.cardNumber}
                            onChange={handleDebitCardDetailsChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Expiry Date"
                            name="expiryDate"
                            value={debitCardDetails.expiryDate}
                            onChange={handleDebitCardDetailsChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="CVV"
                            name="cvv"
                            value={debitCardDetails.cvv}
                            onChange={handleDebitCardDetailsChange}
                            variant="outlined"
                            margin="normal"
                        />
                    </div>
                )}

                {/* Proceed to checkout */}
                <Button
                    fullWidth
                    onClick={handleProceedToCheckout}
                    sx={{ textTransform: 'capitalize' }}
                    variant='contained'
                    size={isMediumScreen ? 'small' : 'medium'}
                    color='success'>
                    Proceed to checkout
                </Button>

                {/* Error message */}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default OrderSummary;
