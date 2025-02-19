import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "./assets/assets";

const App = () => {
  return (
    <div
      className="min-h-screen bg-center bg-repeat px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      style={{ backgroundImage: `url(${assets.bg_image})` }}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/collection" element={<Collection></Collection>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/product/:productId" element={<Product></Product>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/place-order" element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
