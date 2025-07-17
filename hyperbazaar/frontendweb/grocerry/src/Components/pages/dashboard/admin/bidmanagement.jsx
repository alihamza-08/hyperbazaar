import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BidManagementPage = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vi/bid/bids');
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const approveBid = async (bidId) => {
    try {
      await axios.put(`http://localhost:3000/api/vi/bid/bids/approve/${bidId}`);
      fetchBids(); 
    } catch (error) {
      console.error('Error approving bid:', error);
    }
  };

  const rejectBid = async (bidId) => {
    try {
      await axios.put(`http://localhost:3000/api/vi/bid/bids/disapprove/${bidId}`);
   
      fetchBids(); 
    } catch (error) {
      console.error('Error rejecting bid:', error);
    }
  };

  return (
    <div className="container mx-auto px-10 py-14">
      <h2 className="text-2xl font-semibold mb-4">Bid Management</h2>
      <ul className="divide-y divide-gray-200">
        {bids.map((bid) => (
          <li key={bid._id} className="py-4">
            <p className="text-gray-700">Bid ID: {bid._id}</p>
            <p className="text-gray-700">Bid Amount: {bid.bidAmount}</p>
            <p className="text-gray-700">Status: {bid.status}</p>
            {bid.status === 'pending' && (
              <div className="mt-2">
                <button
                  onClick={() => approveBid(bid._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectBid(bid._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidManagementPage;
