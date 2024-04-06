import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/img/stocktrack-logo.png'

const Footer = () => {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <Link to="/">
                <img src={Logo} className="w-16 mb-5" alt="stock track"/>
              </Link>
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 className="text-sm mt-0 mb-2 text-blueGray-900">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <a href="https://teitter.com/rajisanjo" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                    <i className="fab fa-twitter"></i>
                  </button>
                </a>
                <a href="https://facebook.com/omosanjos" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                    <i className="fab fa-facebook-square"></i>
                  </button>
                </a>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-dribbble"></i>
                </button>
                <a href="https://github.com/rajiss-ctrl" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                    <i className="fab fa-github"></i>
                  </button>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/about" className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link to="/github" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        Github
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block font-semibold uppercase text-blueGray-500 text-sm  mb-2">
                    Terms and policies
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/license" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        MIT License
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="text-blueGray-600 hover:text-blueGray-800  block pb-2 text-sm">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-900 py-1">
                Copyright © {new Date().getFullYear()} HackyRaji .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
