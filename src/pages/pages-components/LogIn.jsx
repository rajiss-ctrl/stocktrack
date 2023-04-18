import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db/firebase";
import { setUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";

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
      <div className="w-[95%] md:w-[80%] p-[10px] less_sm:p-[20px] shadow">
        <p className="text-[#000007] text-[18px]">Log in to your dashboard</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-[100%] mb-3  
            border border-[#e7e6e6]           
            outline-[0] border-[none] 
            rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
            text-[#808080] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-[100%] mb-3  
            border border-[#e7e6e6]           
            outline-[0] border-[none] 
            rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
            text-[#808080] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-[200px] h-[40px] less_sm:h-[45px] 
                    rounded  
                    hover:bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#b0f328_-56.25deg,_#f79daf_37.5deg,_#ff6584_191.25deg,_#ff6584_303.75deg,_#f79daf_397.5deg)] text-[#FFFFFF]
                    bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#f79daf_-56.25deg,_#b0f328_37.5deg,_#ff6584_191.25deg,_#f79daf_303.75deg,_#ff6584_397.5deg)]
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
