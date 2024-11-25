import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../db/firebase";
import Drownfan from "../../assets/img/drownfan.png";
import Navbar from "../../components/Navbars/IndexNavbar";

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#F3F5F7] to-[#D1C4E9] flex items-center justify-center overflow-hidden">
      <Navbar />
      <div className="absolute top-24 right-24 opacity-30 hidden sm:block">
        <img src={Drownfan} alt="drown fan" className="w-[250px] h-auto" />
      </div>
      <div className="w-4/5 xl:w-2/5 flex items-center justify-center flex-col bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-[#46148B] text-2xl font-bold mb-6">Reset Your Password</h2>
        <input
          type="email"
          className="shadow-lg placeholder-[#46148B] text-[#46148B] rounded-md border p-4 w-full mb-5 outline-none bg-transparent focus:ring-2 focus:ring-[#46148B]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
        <button
          className="w-full sm:w-auto bg-[#46148B] text-white text-sm font-bold py-3 px-5 rounded-md transition-all duration-300 ease-in-out hover:bg-[#5C43A5] focus:ring-2 focus:ring-[#46148B]"
          onClick={() => sendPasswordReset(email)}
        >
          Submit
        </button>
        <div className="mt-6 flex justify-between items-center w-full text-sm">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <Link className="text-[#46148B] hover:text-[#5C43A5]" to="/signinsignup">
              Login
            </Link>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-right mt-2 sm:mt-0">
            <Link className="text-[#46148B] hover:text-[#5C43A5]" to="/">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
