import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentUserSlice";
import { auth } from "../../db/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaAt, FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [serverErr, setServerErr] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email field is required!"),
    password: yup.string().min(8).max(20).required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleShowPassword = () => {
    setHidePassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Dispatch the current user to Redux
      dispatch(setCurrentUser({ uid: user.uid, email: user.email }));

      // Store user in session storage
      sessionStorage.setItem("currentUser", JSON.stringify({ uid: user.uid, email: user.email }));

      navigate("/dashboard");
    } catch (err) {
      setServerErr("Internet issues or wrong credentials!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="signup" className="w-full md:w-2/3 flex flex-col items-center justify-center mt-16">
      <div className="w-[90%] md:w-[80%] bg-white shadow-lg rounded-lg p-8">
        <p className="text-xl font-bold text-[#46158B]">Sign in</p>
        <form className="w-full flex flex-col mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow py-3 mb-5 flex items-center px-3 rounded w-full bg-[#eceff1]">
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email"
              className="outline-none bg-[#eceff1] w-full"
              disabled={currentUser}
            />
            <FaAt className="text-[#888988]" />
          </div>
          <p className="text-red-500 text-xs">{errors.email?.message}</p>

          <div className="shadow py-3 mb-5 flex items-center px-3 rounded w-full bg-[#eceff1]">
            <input
              {...register("password")}
              id="password"
              type={hidePassword ? "password" : "text"}
              placeholder="Password"
              className="outline-none bg-[#eceff1] w-full"
              disabled={currentUser}
            />
            <div onClick={handleShowPassword}>
              <FaEye className={`${hidePassword ? "block" : "hidden"} text-[#888988]`} />
              <FaEyeSlash className={`${hidePassword ? "hidden" : "block"} text-[#888988]`} />
            </div>
          </div>
          <p className="text-red-500 text-xs">{errors.password?.message}</p>

          <button type="submit" className="w-full shadow h-[45px] rounded-lg bg-[#46158B]" disabled={loading || currentUser}>
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
        </form>
        {serverErr && <p className="text-red-500 mt-4">{serverErr}</p>}
      </div>
    </main>
  );
};

export default SignIn;
