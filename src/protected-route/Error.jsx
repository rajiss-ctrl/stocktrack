import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);  // Adjusted timeout to 5 seconds for a better user experience
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-r from-[#FF6F61] to-[#FF9A8B] text-white flex justify-center items-center p-6">
      <div className="text-center max-w-lg px-4 py-6 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-lg mb-6 text-gray-200">
          The page you're looking for doesn't exist or has been moved. Please go back to the home page.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-[#213A84] text-white rounded-md hover:bg-[#FF6F61] transition duration-300 ease-in-out shadow-md text-xl font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
