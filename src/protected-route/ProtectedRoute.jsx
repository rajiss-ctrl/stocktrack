import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../db/firebase";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const user = useSelector((state) => state.user.user);
  // console.log(user);

  return currentUser === null ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRoute;
