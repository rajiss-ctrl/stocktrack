import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { auth } from "../../db/firebase";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    setError("");
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(setUser({ id: user.uid, email: user.email })); //Substitute the console.log with this
          // ...
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);

          // ..
        });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="w-full  flex flex-col items-center justify-center mt-[60px] ">
      <div className="w-[95%] md:w-[80%] p-[10px] less_sm:p-[20px] shadow">
        <p className="text-[rgb(255,_101,_132)]">Register here</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="w-[100%] mb-3  
                    border bg-[#edf6d9]
                    outline-[0] border-[none] 
                    rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
                    text-[#808080] text-[14px] lg:text-[18px] 
                    p-[13px] 
                    "
            placeholder="Business Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-[100%] mb-3  
                    border bg-[#edf6d9]
                    outline-[0] border-[none] 
                    rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
                    text-[#808080] text-[14px] lg:text-[18px] 
                    p-[13px] 
                    "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-[100%] mb-3  
                    border bg-[#edf6d9]
                    outline-[0] border-[none] 
                    rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
                    text-[#808080] text-[14px] lg:text-[18px] 
                    p-[13px] 
                    "
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/*password error */}
          <div className="text-[red] my-[5px]">
            {error ? <span>{error}</span> : ""}
          </div>
          <button
            type="submit"
            className="w-[200px] h-[40px] less_sm:h-[45px] 
                    rounded  
                    hover:bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#b0f328_-56.25deg,_#f79daf_37.5deg,_#ff6584_191.25deg,_#ff6584_303.75deg,_#f79daf_397.5deg)] text-[#FFFFFF]
                    bg-[conic-gradient(from_142.8deg_at_58.75%_50%,_#f79daf_-56.25deg,_#b0f328_37.5deg,_#ff6584_191.25deg,_#f79daf_303.75deg,_#ff6584_397.5deg)]
                    "
          >
            REGISTER
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
