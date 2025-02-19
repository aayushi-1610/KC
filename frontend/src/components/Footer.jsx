import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-[300px] w-screen max-w-[100vw]"
      style={{
        backgroundImage: `url(${assets.footer_bg})`,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      <div className="backdrop-brightness-95 py-10 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <img src={assets.logo} className="mb-5 w-24 md:w-32" alt="Logo" />
              <p className="text-black text-sm md:text-base leading-relaxed">
                Embrace the Timeless Beauty of Tradition with Kashvi Creations.
                From the Heart of Surat, We Bring You Exquisite Sarees Woven
                with Elegance and Crafted with Love.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <p className="text-lg md:text-xl font-medium mb-3 text-black">
                COMPANY
              </p>
              <ul className="flex flex-col gap-2 text-black text-sm md:text-base">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/collection" className="hover:underline">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link to="/reel" className="hover:underline">
                    Inspo
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-lg md:text-xl font-medium mb-3 text-black">
                GET IN TOUCH
              </p>
              <ul className="flex flex-col gap-2 text-black text-sm md:text-base">
                <li>
                  <a href="tel:+919376421333" className="hover:underline">
                    +91 9376421333
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kashvicreation10@gmail.com"
                    className="hover:underline"
                  >
                    kashvicreation10@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8">
            <hr className="border-gray-500" />
            <p className="py-5 text-center text-sm text-black">
              Copyright 2025@ KashviCreations.com - All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
