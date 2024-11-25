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
      userG && navigate("/dashboard");
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
      className="w-full md:w-2/3  h-auto lg:h-auto flex flex-col items-center justify-center mt-16"
    >
      <div className="w-[90%] md:w-[80%] bg-white shadow-lg rounded-lg p-8">
        <p className="text-xl font-bold text-[#46158B]">Sign in</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="shadow py-3 mb-5 flex items-center px-3 rounded w-full bg-[#eceff1]">
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email"
              className="outline-none bg-[#eceff1] w-full text-lg text-gray-700"
              disabled={currentUser}
            />
            <FaAt className="text-[#888988]" />
          </div>
          <p className="text-red-500 text-xs">{errors.email?.message}</p>

          <div className="shadow py-3 mb-5 flex items-center px-3 rounded w-full bg-[#eceff1]">
            <input
              {...register("password")}
              id="password"
              type={`${hidePassword ? "password" : "text"}`}
              placeholder="Password"
              className="outline-none bg-[#eceff1] w-full text-lg text-gray-700"
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
          <p className="text-red-500 text-xs">{errors.password?.message}</p>

          <button
            type="submit"
            className="w-full shadow h-[45px] rounded-lg bg-[#46158B] hover:bg-[#3c0d76] text-white text-lg mt-4"
            disabled={currentUser || loading}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

          <div className="flex justify-center sm:justify-between flex-col sm:flex-row w-full mt-6">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full sm:w-48 h-[45px] bg-gray-100 rounded-lg text-sm text-[#838C96] flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none transition-all duration-200 mt-3"
              disabled={currentUser}
            >
              <img className="w-10 mr-2" src={Guest} alt="Guest" />
              SIGN IN AS GUEST
            </button>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full sm:w-48 h-[45px] bg-white rounded-lg text-sm text-[#838C96] flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none transition-all duration-200 mt-3"
            >
              <img className="w-8 mr-2" src={Google} alt="Google" />
              Google Sign-In
            </button>
          </div>
        </form>
        {serverErr && <p className="text-red-500 mt-4 text-center">{serverErr}</p>}
      </div>
    </main>
  );
};

export default SignIn;
