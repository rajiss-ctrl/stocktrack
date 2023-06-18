import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../db/firebase";
// import { auth, sendPasswordResetEmail } from "./firebase";

function Reset() {
  const [email, setEmail] = useState("");
  //   const [user, loading, error] = useAuthState(auth);
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

  //   useEffect(() => {
  //     if (loading) return;
  //     if (user) navigate("/dashboard");
  //   }, [user, loading]);
  return (
    <div className="w-full h-screen flex items-center justify-center shadow">
      <div className="w-4/5 xl:w-2/5 flex items-center justify-center flex-col">
        <input
          type="text"
          className=" border-[1.3px] border-[#417141] p-4 w-full mb-5 outline-none bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <div className="flex flex-col sm:flex-row items-center w-full  justify-between text-sm">
          <button
            className=" bg-black text-sm text-white p-4 rounded-[20px]"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <div className=" mt-6 sm:mt-0 text-md">
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/">
              Register
            </Link>{" "}
            now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reset;
