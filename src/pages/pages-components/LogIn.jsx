import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, useAuth } from "../../db/firebase";
import { useDispatch } from "react-redux";
import { FaAt, FaEye } from "react-icons/fa";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Firebase function that allows users sign-in via Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  return (
    <main
      id="signup"
      className="w-full h-auto lg:h-96  flex flex-col items-center 
               justify-center mt-[60px]"
    >
      <div className="w-[90%] md:w-[80%] p-[10px] less_sm:p-[20px]">
        <p className="text-[#000007] leading-6 sm:text-[1rem]">
          Log in to your dashboard
        </p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit}
        >
          <div
            className=" mb-3 flex 
             border-b-[1px] border-[#191c1a]           
            outline-none
            w-[100%] h-[42px] sm:h-[54px] 
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px_13px_2rem_13px] 
            "
          >
            <input
              id="email"
              type="email"
              placeholder="Email"
              className=" mb-3  
             border-none          
            outline-none
            w-[100%] h-[98%]  
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FaAt className="text-[#888988]" />
          </div>
          <div
            className=" mb-3 flex 
             border-b-[1px] border-[#191c1a]           
            outline-none
            w-[100%] h-[42px] sm:h-[54px] 
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
          >
            <input
              id="password"
              type="password"
              placeholder="Password"
              className=" mb-6  
             border-none          
            outline-none
            w-[100%] h-[98%]  
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FaEye className="text-[#888988]" />
          </div>

          <button
            type="submit"
            className="w-full less_sm:w-[50%] h-[40px] less_sm:h-[45px] 
                    rounded-lg bg-dark-purple hover:bg-dark-purp-hover text-sm sm:md text-white"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
