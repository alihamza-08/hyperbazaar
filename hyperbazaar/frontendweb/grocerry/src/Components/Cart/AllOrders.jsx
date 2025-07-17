

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vi/order/get-orders');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/vi/order/update-order-status/${orderId}`, { status: newStatus });
      // Update status in the UI
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          order.status = newStatus;
        }
        return order;
      });
      setOrders(updatedOrders);
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Order Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orderItems.map(item => item.productName).join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orderItems.map(item => item.quantity).join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    if (order.status === 'Shipped') {
                      toast.error(`Order ${order._id} is already shipped.`);
                    } else {
                      handleUpdateStatus(order._id, 'Shipped');
                    }
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                  style={{
                    background: "green",
                    color: "white",
                    padding: ".4rem",
                    borderRadius: "7px",
                    fontWeight:"500",
                  }}
                >
                  Ship
                </button>
                <button
                  onClick={() => {
                    if (order.status === 'Delivered') {
                      toast.error(`Order ${order._id} is already delivered.`);
                    } else {
                      handleUpdateStatus(order._id, 'Delivered');
                    }
                  }}
                  className="text-green-600 hover:text-green-900 ml-2"
                  style={{
                    background: "green",
                    color: "white",
                    padding: ".4rem",
                    borderRadius: "7px",
                    fontWeight:"500",
                  }}
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
