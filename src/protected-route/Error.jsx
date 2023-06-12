import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);
  return (
    <div className="h-[100vh] text-[red] flex justify-center flex-col items-center">
      <h1 className="text-gray-600">This page does not exist! 404....</h1>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Error;
