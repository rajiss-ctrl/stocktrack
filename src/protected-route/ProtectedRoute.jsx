import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return !user.id ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRoute;
