import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div
      className="w-screen -mx-33.5 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${assets.footer_bg})` }} // Change footer_bg to your image name
    >
      <div className="backdrop-brightness-95">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap- py-10 mt-40 px-20 text-sm text-white">
          <div>
            <img src={assets.logo} className="mb-5 w-32" alt=""></img>
            <p className="w-full md:w-2/3 text-black">
              Embrace the Timeless Beauty of Tradition with Kashvi Creations.
              From the Heart of Surat, We Bring You Exquisite Sarees Woven with
              Elegance and Crafted with Love. Discover a World Where Heritage
              Meets Contemporary Style – Only at Kashvi Creations.
            </p>
          </div>

          <div>
            <p className="text-xl font-medium mb-5 text-black">COMPANY</p>
            <ul className="flex flex-col gap-1 text-black">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-5 text-black">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-black">
              <li>+91 9376421333</li>
              <li>kashvicreation10@gmail.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr className="border-gray-500"></hr>
          <p className="py-5 text-sm text-center text-black">
            Copyright 2025@ KashviCreations.com - All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
