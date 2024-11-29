import React, { useEffect, useState } from "react";
import Spinner from '../assets/img/spinner.svg'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../db/firebase"; // Assuming this is a custom hook to get the user

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(false);
    }
  }, [currentUser]);

  // Show loading indicator while Firebase is checking the user state
  if (loading) {
    return <div className="h-full mt-[150px] flex flex-col items-center justify-center">
      <img src={Spinner} alt="spinner" className="w-24" />
      <h1 className="text-[#2E2EA3] text-sm">Loading...</h1>
      </div>; 
  }

  // If no user, redirect to login page
  return currentUser === null ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
