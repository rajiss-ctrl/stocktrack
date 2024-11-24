import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4 text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-white opacity-50" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="hover:text-yellow-300 text-sm py-1"
                >
                  HackyRaji
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <a
                    href="https://www.creative-tim.com?ref=nr-footer-admin"
                    className="text-yellow-300 hover:text-white text-sm block py-1 px-3"
                  >
                    HackyRaji
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=nr-footer-admin"
                    className="text-yellow-300 hover:text-white text-sm block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com?ref=nr-footer-admin"
                    className="text-yellow-300 hover:text-white text-sm block py-1 px-3"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
