import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db/firebase";
import { setUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { FaAt, FaEye, FaVoicemail } from "react-icons/fa";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Firebase function that allows users sign-in via Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(setUser({ id: user.uid, email: user.email })); //Substitute the console.log with this
        //Substitute the console.log with this
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main
      className="w-full flex flex-col items-center 
                    justify-center mt-[60px]"
    >
      <div className="w-[90%] md:w-[80%] p-[10px] less_sm:p-[20px]">
        <p className="text-[#000007] text-[18px]">Log in to your dashboard</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit}
        >
          <div
            className=" mb-3 flex 
             border-b-[1px] border-[#93b4a1]           
            outline-none
            w-[100%] h-[42px] sm:h-[54px] 
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
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
            <span className="text-[#93b4a1]">
              <FaAt />
            </span>
          </div>
          <div
            className=" mb-3 flex 
             border-b-[1px] border-[#93b4a1]           
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
              className=" mb-3  
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
            <span className="text-[#93b4a1]">
              <FaEye />
            </span>
          </div>

          <button
            type="submit"
            className="w-[100%] less_sm:w-[50%] h-[40px] less_sm:h-[45px] 
                    rounded  
                    hover:bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#000_-56.25deg,_#fff_37.5deg,_#f7c100_191.25deg,_#000_303.75deg,_#f7c100_397.5deg)] text-[#FFFFFF]
                    bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#f7c100_-56.25deg,_#f7c100_37.5deg,_#000_191.25deg,_#f7c100_303.75deg,_#000_397.5deg)]
                    "
          >
            SIGN IN
          </button>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
