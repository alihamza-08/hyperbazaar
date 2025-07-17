import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from "./Components/Products/Products";
import AllCategories from "./Components/AllCategories/Categories";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import About from "./Components/About/About";
import SignUp from "./Components/Authantication/Login/SignUp";
import Login from "./Components/Authantication/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Authantication/Login/register";
import InventoryForm from "./Components/retailerStore/StoreFind";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Dashboard from "./Components/pages/dashboard/admin/Dashboard";
import Category from "./Components/pages/dashboard/admin/CategoryManagement";
import Order from "./Components/pages/dashboard/admin/order";
import ProductManagment from "./Components/pages/dashboard/admin/ProductManagment";
import Alluser from "./Components/Layout/Alluser";
import Users from "./Components/pages/dashboard/admin/Users";
import TeacherDashboard from "./Components/Layout/retailerdashboard";
import RetailerDashboard from "./Components/Layout/retailerdashboard";
import AllProduct from "./Components/Products/AllProduct";
import BidManagementPage from "./Components/pages/dashboard/admin/bidmanagement";
import ProductManagement from "./Components/pages/dashboard/admin/ProductManagment";
import ProductLists from "./Components/pages/dashboard/admin/ProductLists";
import UpdateProduct from "./Components/pages/dashboard/admin/UpdateProduct";
import HomePage from "./HomePage";
import Categories from "./Components/AllCategories/Categories";
import CategoryProduct from "./Components/AllCategories/CategoryProduct";
import FindNearestStore from "./Components/retailerStore/StoreFind";
import FindStoreForm from "./Components/retailerStore/FindStoreForm";
import StoreFind from "./Components/retailerStore/StoreFind";
import CreateStoreForm from "./Components/retailerStore/StoreCreation";
import SingleProduct from "./Components/Products/ProductCard/SingleProduct";
import FindStore from "./Components/retailerStore/FindStore";
import StoreProduct from "./Components/retailerStore/StoreProduct";
import RetailerProducts from "./Components/Products/RetailerProduct";
import OfferList from "./Components/Products/OfferList";
import AllOrders from "./Components/Cart/AllOrders";
import User from './Components/Authantication/Login/User'
import CategoryCard from "./Components/CategoryCard/CategoryCard";

function App() {
  return (
    
      <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/CategoryCard' element={<CategoryCard />} />
          <Route path="/product" element={<AllProduct />} />
          <Route path="/product/:slug" element={<SingleProduct/>} />
          {/* // <Route path="/createStore" element={<InventoryForm />} /> */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/allproducts" element={<ProductManagment />} /> */}
          <Route path="/categories/:categoryName" element={<Products categoryProducts={true} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/User" element={<User />} />
           <Route path="/signup" element={<Register />} />
           <Route path="/category" element={<Category />} />
           <Route path="/StoreProduct" element={<StoreProduct />} />
           {/* <Route path="/create-store" element={<Store/>} /> */}
    

          <Route path="/login" element={<Login />} />
          <Route path="/producthomepage" element={<HomePage />} />
          <Route path="storefind" element={<FindStore/>} />
          <Route path="/storefind/:storeId/products" element={<StoreProduct/>} />
          <Route path="/bidmangement" element={<BidManagementPage />} />

          {/* <Route path="storefind" element={<FindNearestStore/>} /> */}
           <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="categorymanagement" element={<Category />} />
              <Route path="productmanagement" element={<ProductManagement />} />
              <Route path="product/:slug" element={<UpdateProduct />} />
              <Route path="products" element={<ProductLists />} />
              {/* <Route path="productinventery" element={<InventoryForm />} /> */}
              <Route path="order" element={<Order />} />
              <Route path="alluser" element={<Users />} />
              {/* Add more nested routes here */}
            </Route>
         

{/* // retailer router */}
           <Route element= {<ProtectedRoute />} >
          <Route path="/retailerdashboard" element={<RetailerDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="category" element={<Category />} />
              {/* <Route path="createstore" element={<Store/>} /> */}
              <Route path="productmanagement" element={<ProductManagement />} />
              <Route path="retailerproduct" element={<RetailerProducts />} />
              <Route path="storecreation" element={<CreateStoreForm />} />
              <Route path="offerlist" element={<OfferList/>} />

              <Route path="order" element={<Order />} />
           <Route path="allorders" element={<AllOrders />} />
              <Route path="alluser" element={<Users />} />
              {/* Add more nested routes here */}
            </Route>
            </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Route>
        
        <Route path="/cart" element={<Cart />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App
