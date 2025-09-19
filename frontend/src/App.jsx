import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import React from 'react';
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import RajbhogPage from "./pages/RajbhogPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import AllSweetsPage from "./pages/AllSweetsPage";
import LadoosPage from "./pages/LadoosPage";
import MithaiPage from "./pages/MithaiPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AddProduct from "./components/Admin/AddProduct";

const App = () => {
  return (
    <Provider store ={store}>
    <BrowserRouter>
    <Toaster position ="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />}/>
      <Route path="Login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="collections/all" element={<CollectionPage />} />
      <Route path="collections/all" element={<CollectionPage />} />
      <Route path="rajbhog" element={<RajbhogPage />} />
      <Route path="all-sweets" element={<CollectionPage />} />
      <Route path="ladoos" element={<LadoosPage />} />
      <Route path="mithai" element={<MithaiPage />} />
      <Route path="collections/ladoos" element={<LadoosPage />} />
      <Route path="collections/mithai" element={<MithaiPage />} />
      <Route path="customized" element={<CollectionPage />} />
      <Route path="contact" element={<ContactUsPage />} />
      <Route path="about" element={<AboutUsPage />} />
      <Route path="products/:id" element={<ProductDetails/>} />
      <Route path="checkout" element={<Checkout/>} />
      <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="order/:id" element={<OrderDetailsPage/>} />
      <Route path="my-orders" element={<MyOrdersPage />} />
    </Route>
    {/* Admin Layout */}
    <Route path="/admin" element={
      <ProtectedRoute role = "admin">
      <AdminLayout />
    </ProtectedRoute>}>
      <Route index element={<AdminHomePage />} />
      <Route path="users" element={<UserManagement/>} />
      <Route path="products" element={<ProductManagement/>} />
      <Route path="/admin/products/:id" element={<EditProductPage/>} />
      <Route path="orders" element={<OrderManagement/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
};
export default App;
