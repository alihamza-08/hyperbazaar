import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const FindNearestStore = () => {
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [nearestStore, setNearestStore] = useState(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleFindNearestStore = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/vi/store/find-store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNearestStore(data.data);
        } catch (error) {
            console.error('Error finding nearest store:', error);
        }
    };
    
    return (
        <section className='h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8'>
            <div>
                <Form className='d-flex gap-3'>
                    <Form.Group>
                        <Button variant="primary" onClick={handleGetLocation}>Get Current Location</Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" value={location.latitude} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" value={location.longitude} readOnly />
                    </Form.Group>
                    <Button variant="primary" onClick={handleFindNearestStore}>Find Nearest Store</Button>
                </Form>
                {nearestStore && (

                         
             nearestStore?.map((store,index )=>(
                <div className="card w-96 bg-base-100 shadow-xl image-full" key={index}>
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{store.storeName}</h2>
                  <p>{store.address}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" >Buy Now</button>
                  </div>
                </div>
              </div>
             ))
                     
                
                )}
            </div>
        </section>
    );
};

export default FindNearestStore;
