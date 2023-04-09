import React from "react";
import Err from "../assets/images/error.png";

const Error = () => {
  return (
    <div className="h-[100vh] text-[red] flex justify-center flex-col items-center">
      <img src={Err} alt="404 error" />
    </div>
  );
};

export default Error;
