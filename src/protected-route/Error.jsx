import React from "react";
import Err from "../assets/images/error.png";
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
      <img className="w-[80%]" src={Err} alt="404 error" />
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Error;
