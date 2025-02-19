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
      className="w-screen relative flex items-center justify-between py-8 pt-8 font-medium bg-cover bg-center bg-no-repeat h-48"
      style={{
        backgroundImage: `url(${assets.navbar_bg})`,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <Link to="/">
          <img src={assets.logo} className="w-20 mt-0 mb-14" alt="Logo" />
        </Link>

        <ul className="hidden mb-10 sm:flex gap-8 md:gap-12 lg:gap-20 text-white text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>
          <NavLink to="/reel" className="flex flex-col items-center gap-1">
            <p>INSPO</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>
        </ul>

        <div className="flex mr-2 sm:mr-4 mb-14 items-center gap-4 sm:gap-8">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-8 sm:w-10 cursor-pointer"
            alt="Search"
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-10 sm:w-12 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                  <Link to="/Profile">
                    <p className="cursor-pointer hover:text-black">
                      My Profile
                    </p>
                  </Link>
                  <Link to="/orders">
                    <p className="cursor-pointer hover:text-black">Orders</p>
                  </Link>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-10 sm:w-12 min-w-5"
              alt="Cart"
            />
            <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-8 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`fixed top-0 right-0 h-full z-50 overflow-hidden bg-white transition-all duration-300 shadow-lg ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 cursor-pointer border-b"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-100"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-100"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-100"
            to="/reel"
          >
            INSPO
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-100"
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
