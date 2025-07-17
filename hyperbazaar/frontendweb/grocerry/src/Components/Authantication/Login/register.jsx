import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        storeName: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { ...formData, role: 'retailer' }; // Adding role directly to the data
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', dataToSend);
            console.log(response.data); // Handle success response
            alert('Register Successfully Done!');
            setFormData({
                storeName: '',
                username: '',
                email: '',
                phone: '',
                address: '',
                password: ''
            });
        } catch (error) {
            console.error('Registration failed:', error); // Handle error
            alert('Registration failed, please try again.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex justify-center items-center">
            <div className="hero-content flex flex-col  lg:flex-row justify-center items-center" style={{gap:"6rem", paddingTop:"13vh" }}>
                <div className="hidden lg:block lg:w-1/2">
                    <img src="loginAnimation.gif" alt="Your Image" className="h-auto" style={{width:"38rem", borderRadius:"80%"}} />
                </div>
                <div className='w-full lg:w-1/2 sm:w-100'>
                    <div className="card w-full  shadow-2xl bg-base-100">
                        <form className="card-body border-none" onSubmit={handleSubmit}>
                            <div className='flex gap-4'>
                                <div className="form-check form-check-inline fs-6">
                                    <label className="form-check-label fs-5 fw-bold font-bold" htmlFor="inlineRadio1">Retailer</label>
                                </div>
                            </div>
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Store Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a Store Name"
                                    className="input input-bordered"
                                    name="storeName"
                                    value={formData.storeName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a username"
                                    className="input input-bordered"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Phone */}
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="input input-bordered"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Address */}
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Password */}
                            <div className="form-control p-0 border-none">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Register Button */}
                            <div className="form-control mt-4">
                                <button type="submit" className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-700 text-white font-bold border-none outline-none">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
