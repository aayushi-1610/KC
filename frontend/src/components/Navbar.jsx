import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Clear the token from context
    setToken("");
    // Clear the cart items from context
    setCartItems({});
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div
      className="w-screen -mx-33.5 relative flex items-center justify-between py-8 pt-8 font-medium bg-cover bg-center bg-no-repeat h-48"
      style={{ backgroundImage: `url(${assets.navbar_bg})` }}
    >
      <Link to="/">
        <img src={assets.logo} className="w-20 mt-0 mb-14 ml-4" alt=""></img>
      </Link>
      <ul className="hidden mb-10 sm:flex gap-20 text-white text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden"></hr>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden"></hr>
        </NavLink>
        <NavLink to="/reel" className="flex flex-col items-center gap-1">
          <p>INSPO</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden"></hr>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden"></hr>
        </NavLink>
      </ul>
      <div className="flex mr-8 mb-14 items-center gap-8">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-10 cursor-pointer"
          alt=""
        ></img>
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-12 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          ></img>
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link to="/Profile">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                </Link>
                <Link to="/orders">
                  <p className="cursor-pointer hover:text-black">Orders</p>
                </Link>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-12 min-w-5" alt=""></img>
          <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        ></img>
      </div>

      {/* Sidebar menu for small screen*/}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt=""
            ></img>
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/reel"
          >
            INSPO
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
