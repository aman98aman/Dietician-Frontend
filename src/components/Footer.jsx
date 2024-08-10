import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/giphy.gif";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Address */}
          <div className="w-full md:w-1/4 mb-4">
          <div className="flex flex-1 items-center justify-between">
          <a href="/" className="flex text-lg font-semibold">
            <img className="rounded-lg"
              src={logo}
              width="37"
              height="30"
              alt="Fit Logo"
            />
            <div className="text-1xl text-red-500 font-bold">Arsh-Sandhu</div>
          </a>
        </div>
            <p className="mt-2 text-gray-400">
              Address:
              <br />
              SCO 292,
              <br />
              Sector 32
              <br />
              Chandigarh.
            </p>
          </div>

          {/* About */}
          <div className="w-full md:w-1/4 mb-4">
            <h2 className="text-2xl font-bold">ABOUT</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full md:w-1/4 mb-4">
            <h2 className="text-2xl font-bold">SUPPORT</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="mailto:info@arshsandhufitness.com"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Support@arshsandhufitness.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition duration-300 ease-in-out hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="w-full md:w-1/4 mb-4">
            <h2 className="text-2xl font-bold">CONTACT US</h2>
            <p className="mt-2 text-gray-400">
              <a
                href="tel:+919689400002"
                className="block transition duration-300 ease-in-out hover:text-white"
              >
                +91-9689400002
              </a>
              <a
                href="mailto:info@arshsandhufitness.com"
                className="block transition duration-300 ease-in-out hover:text-white"
              >
                info@arshsandhufitness.com
              </a>
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="bg-red-800 p-2 rounded-full text-white transition duration-300 ease-in-out hover:bg-red-600"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="bg-red-800 p-2 rounded-full text-white transition duration-300 ease-in-out hover:bg-red-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="bg-red-800 p-2 rounded-full text-white transition duration-300 ease-in-out hover:bg-red-600"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

