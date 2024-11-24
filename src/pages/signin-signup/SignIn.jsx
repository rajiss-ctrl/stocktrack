import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db, { auth, useAuth } from "../../db/firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import Google from '../../assets/img/google.svg';
import Guest from '../../assets/img/guest.png';
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { FaAt, FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const guestEmail = "stocktrack.guest@gmail.com";
  const guestPass = "stocktrack02!";
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState("");
  const currentUser = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  // Schema definition moved above
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email field is required!"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleShowPassword = () => {
    setHidePassword((prev) => !prev);
  };

  const onSubmit = (data) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        navigate("/dashboard");
        reset();
      })
      .catch((err) => {
        const errorMessage = "Internet issues or wrong credentials!";
        setServerErr(errorMessage);
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userG = res.user;

      const q = query(collection(db, "users"), where("uid", "==", userG.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: userG.uid,
          name: userG.displayName,
          authProvider: "google",
          email: userG.email,
        });
      }
      navigate("/dashboardtest");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuestLogin = () => {
    signInWithEmailAndPassword(auth, guestEmail, guestPass)
      .then((userCredential) => {
        const user = userCredential.user;
        user && navigate("/dashboard");
      })
      .catch((error) => {
        if (error) {
          let error = "Internet issues or wrong credentials!";
          setServerErr(error);
        }
      });
  };

  return (
    <main
      id="signup"
      className="w-full md:w-2/3 h-auto lg:h-96 flex flex-col items-center 
               justify-center mt-[60px]"
    >
      <div className="w-[90%] shadow-lg bg-[#eceff1] rounded-sm md:w-[80%] p-[10px] less_sm:p-[20px]">
        <p className="text-[#000007] leading-6 sm:text-sm">Sign in</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="shadow py-5 mb-3 flex items-center px-2 rounded w-[100%] bg-white h-[40px]">
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder={`${currentUser?.email || "Email"}`}
              className="outline-none bg-white w-full border-0 capitalize"
              disabled={currentUser}
            />
            <FaAt className="text-[#888988]" />
          </div>
          <p className="text-[red] pb-2 text-xs">{errors.email?.message}</p>
          <div className="shadow py-5 mb-3 flex items-center px-2 rounded w-[100%] bg-white h-[40px]">
            <input
              {...register("password")}
              id="password"
              type={`${hidePassword ? "password" : "text"}`}
              placeholder="Password"
              className="outline-none bg-white w-full border-0 capitalize"
              disabled={currentUser}
            />
            <div onClick={handleShowPassword}>
              <FaEye
                className={`${hidePassword ? "block" : "hidden"} text-[#888988]`}
              />
              <FaEyeSlash
                className={`${hidePassword ? "hidden" : "block"} text-[#888988]`}
              />
            </div>
          </div>
          <p className="text-[red] text-xs">{errors.password?.message}</p>
          <button
            type="submit"
            className="w-full shadow h-[40px] less_sm:h-[45px] rounded-lg bg-[#46158B] hover:bg-dark-purp-hover text-sm sm:md text-white mt-4"
            disabled={currentUser || loading}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
          <div className="flex justify-center sm:justify-between flex-col sm:flex-row  w-full">
          <button
            type="submit"
            onClick={handleGuestLogin}    
            className="border-0 flex mt-4 items-center active:bg-lightBlue-600 w-full less_sm:w-[49%] h-[40px] less_sm:h-[45px] text-[0.65rem] leading-[0.8rem] tracking-tight md:tracking-wide lg:tracking-widest md:font-semibold uppercase bg-gray-100 md:bg-white px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            disabled={currentUser}
          >
            <img className="w-[40px] text-center pr-2 md:pl-1" src={Guest} alt="..."/> 
            <span className="font-[560] text-[13px] sm:text-sm text-[#838C96]">SIGN IN AS GUEST</span>
          </button>
          <button
            className="border-0 flex mt-4 items-center active:bg-lightBlue-600 w-full less_sm:w-[49%] h-[40px] less_sm:h-[45px] text-[0.65rem] leading-[0.8rem] tracking-tight md:tracking-wide lg:tracking-widest md:font-semibold uppercase bg-gray-100 md:bg-white px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={signInWithGoogle}
          >
            <span className="hidden md:block">google sign-in</span>
            <img className="w-[30px] text-center pr-2 md:pl-1" src={Google} alt="..."/> 
            <span className="text-xs md:hidden">sign-in</span>  
          </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
