import { sendPasswordResetEmail } from "firebase/auth";
import React, {  useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../db/firebase";
import Drownfan from "../../assets/img/drownfan.png";
import Navbar from "../../components/Navbars/IndexNavbar";
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
    <div className="sm:relative w-full h-screen hero-bg bg-[#F3F5F7] flex items-center justify-center shadow">
      <Navbar/>
      <div className="hidden sm:block sm:absolute top-24 right-24">
        <img src={Drownfan} alt="drown fan" />
      </div>
      <div className="w-4/5 xl:w-2/5 flex items-center justify-center flex-col">
        <input
          type="text"
          className="shadow-xl placeholder-[#46148B] text-white  rounded-md border-0 p-4 w-full mb-5 outline-none bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <div className="flex flex-col sm:flex-row items-center w-full  justify-between text-sm">
          <button
            className="w-full sm:w-auto hover:px-10  text-sm xl:text-xs font-bold  bg-[#46148B] text-white hover:bg-[#535252] py-2 px-3 rounded-md"
            onClick={() => sendPasswordReset(email)}
          >
            Submit 
          </button>
          <div className="w-full sm:w-auto sm:flex sm:gap-2">
          <div className="w-full text-center sm:w-auto border-[0.002rem] border-[#46148B] px-2 rounded-md py-2 sm:py-1 mt-6 sm:mt-0 text-md">
            <Link className="" to="signin">
              Login
            </Link>{" "}
          </div>
          <div className="hidden sm:block border-[0.002rem] border-[#46148B] px-2 rounded-md py-1 mt-6 sm:mt-0 text-md">
            <Link className="" to="/">
              Home
            </Link>{" "}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reset;
