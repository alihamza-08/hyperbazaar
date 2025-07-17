import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const FindStore = () => {
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [nearestStore, setNearestStore] = useState(null);
    const navigate = useNavigate();
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
            console.log(response);
            const data = await response.json();
            console.log(data.data);
            setNearestStore(data.data);
        } catch (error) {
            console.error('Error finding nearest store:', error);
        }
    };

    

  return (
    <div className='pt-[5rem]'>
        <Form className='flex justify-center gap-8'>
                    <Form.Group>
                        <Button  className="bg-green-800 hover:bg-green-600 text-white"onClick={handleGetLocation} >Get Current Location</Button>
                    </Form.Group>
                    <Form.Group className='flex justify-center items-center'>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" value={location.latitude} readOnly />
                    </Form.Group>
                    <Form.Group className='flex justify-center items-center'>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" value={location.longitude} readOnly />
                    </Form.Group>
                    <Button  className="bg-green-800 hover:bg-green-600 text-white"onClick={handleFindNearestStore}>Find Nearest Store</Button>
                </Form>
      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-3 sm:mt-10 px-8">
          <div>
            <h1 className="text-2xl font-medium font-poppins mb-4">Nearest Store</h1>
            <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
              {nearestStore &&
                nearestStore?.map((store, index) => (

                  <div
                    className="card  p-2 w-96 bg-base-100 shadow-xl image-full"
                    key={index}
                    onClick={()=>navigate(`/storefind/${store._id}/products`)}
                  >
                 <figure>
                      <img
                        // src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        src={`http://localhost:3000/api/vi/store/find-store/${store._id}`} 
                        alt="Shoes"
                      />
                    </figure>
                  
                    <div className="card-body">
                      <h2 className="card-title">{store.storeName}</h2>
                      <p>{store.address}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Click Now</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindStore;
