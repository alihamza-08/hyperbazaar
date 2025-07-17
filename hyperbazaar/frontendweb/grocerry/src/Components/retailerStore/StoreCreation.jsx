import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStoreForm = () => {
    const [formData, setFormData] = useState({
        storeName: '',
        business_email: '',
        address: '',
        pin: '',
        latitude: '',
        longitude: '',
        image: null
    });

    const [retailerId, setRetailerId] = useState(null);

    useEffect(() => {
        // Get retailer ID from local storage when component mounts
        const storedRetailerId = localStorage.getItem('userId');
        if (storedRetailerId) {
            setRetailerId(storedRetailerId);
        } else {
            console.error('No retailer ID found in local storage');
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setFormData({
                    ...formData,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString()
                });
            },
            error => {
                console.error('Error getting location:', error);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { storeName, business_email, address, pin, latitude, longitude, image } = formData;
            console.log('Form Data:', formData);

            const formDataToSend = new FormData();
            formDataToSend.append('storeName', storeName);
            formDataToSend.append('business_email', business_email);
            formDataToSend.append('address', address);
            formDataToSend.append('pin', pin);
            formDataToSend.append('latitude', latitude);
            formDataToSend.append('longitude', longitude);
            formDataToSend.append('image', image);
            formDataToSend.append('retailer_id', retailerId); // Include retailer_id in the FormData object

            const response = await axios.post('http://localhost:3000/api/vi/store/createStore', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                alert("Store created successfully");
            }
            console.log('Store created:', response);
            setFormData({
                storeName: '',
                business_email: '',
                address: '',
                pin: '',
                latitude: '',
                longitude: '',
                image: null
            });
        } catch (error) {
            console.error('Error creating store:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Store</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input type="text" id="storeName" name="storeName" value={formData.storeName} onChange={handleChange} className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" name="image" onChange={handleChange} className="form-input mt-1 block w-full" accept="image/*" />
                    </div>
                    <div>
                        <label htmlFor="business_email" className="block text-sm font-medium text-gray-700">Business Email</label>
                        <input type="email" id="business_email" name="business_email" value={formData.business_email} onChange={handleChange} className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                        <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN</label>
                        <input type="text" id="pin" name="pin" value={formData.pin} onChange={handleChange} className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} className="form-input mt-1 block w-full" placeholder="Latitude" required />
                    </div>
                    <div>
                        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} className="form-input mt-1 block w-full" placeholder="Longitude" required />
                    </div>
                    <div>
                        <button type="button" onClick={handleGetLocation} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Get Current Location</button>
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">Create Store</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateStoreForm;
