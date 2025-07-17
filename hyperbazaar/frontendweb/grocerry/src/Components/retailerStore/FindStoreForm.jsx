import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FindStoreForm = ({ onFindNearestStore }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onFindNearestStore(location);
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-20 ml-10'>
      <Button variant="primary" onClick={handleGetLocation}>
        Get Current Location
      </Button>
      <br />

      <br />
      <Form.Group controlId="latitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="text" name="latitude" value={location.latitude} readOnly />
      </Form.Group>
      <Form.Group controlId="longitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="text" name="longitude" value={location.longitude} readOnly />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!location.latitude || !location.longitude}>
        Find Nearest Store
      </Button>
    </Form>
  );
};

export default FindStoreForm;
