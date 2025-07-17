import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdBorderAll, MdDashboard, MdOutlineVerifiedUser, MdSuperscript, MdSupervisedUserCircle, MdVerifiedUser } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";


const shairlink = (
    <>
       <li>
        <Link to="/" className='mt-3'><MdDashboard/> Home</Link>
        </li>
        <li>
        <Link to="/menu" className='mt-3'><MdDashboard/> Menu</Link>
        </li>
        <li>
        <Link to="/" className='mt-3'><MdDashboard/> Order Tracking </Link>
        </li>
        <li>
        <Link to="/" className='mt-3'><MdDashboard/>Customer Supprt</Link>
        </li>
        <li>
        <Link to="/" className='mt-3 text-white bg-primary '><MdDashboard/>Customer Supprt</Link>
        </li>
    </>
)
const DashboardLayout = () => {
  return (
    <div >
       <div className="drawer sm:drawer-open" style={{marginTop:"4rem", zIndex:"1"}}>
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col sm:items-start sm:justify-start ">
    {/* Page content here */}
    <div className='flex items-center justify-between mx-4'>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button sm:hidden">
     <MdDashboardCustomize />        
    </label>
    <button className='btn rounded-full px-6 flex item-center gap-2 bg-success text-white sm:hidden'>
        <FaRegUser />
        Logout</button>
        </div>
    <div className='mt-5 md:mt-2 mx-4 ' style={{width:"100%"}}>
    <Outlet />
    </div>
        
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li>
        <Link to="/dashboard" className='flex justify-between mb-3 '>
           <img src="/grocery_Febicon.png" alt="logo" className='w-12'/>
           <span className="badge badge-primary p-5 text-color-white">Admin</span>
      </Link></li>
      <hr />
      <li><Link to="/dashboard" className='mt-3'><MdDashboard/> Dashboard</Link></li>
      <li><Link to="/dashboard/categorymanagement"><MdCategory/> Category Management</Link></li>
      {/* <li><Link to="/dashboard/productinventery"><MdSupervisedUserCircle/> Add New Product</Link></li> */}
      <li><Link to="/dashboard/productmanagement"><MdSupervisedUserCircle/> Add New Product</Link></li>
      <li><Link to="/dashboard/product/:slug"><MdSupervisedUserCircle/>Update Product</Link></li>
      <li><Link to="/dashboard/products"><MdSupervisedUserCircle/> All Product</Link></li>
      <li><Link to="/dashboard/order" className='mb-3'><MdBorderAll/> Order</Link></li>
      <li><Link to="/dashboard/alluser" className='mb-3'><MdVerifiedUser/> All User</Link></li>
       <hr />
     {/* {shaired links} */}
     {
        shairlink
     }
    </ul>
  
  </div>
</div>
    </div>
  )
}

export default DashboardLayout