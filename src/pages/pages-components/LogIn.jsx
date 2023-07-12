import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, useAuth } from "../../db/firebase";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { FaAt, FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = () => {
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState("");
  const currentUser = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => {
    setHidePassword((pre) => !pre);
  };
  const schema = yup.object().shape({
    // product_name: yup.string().required("product name must not be empty!"),
    email: yup.string().email().required("Email field is required!"),
    // age: yup.number().positive().integer().min(18).required("age most a positive number and more than 18"),
    password: yup.string().min(8).max(20).required(),
    // confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password dont match!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // console.log(data.email);
    // console.log(data.password);
    if (!hidePassword) {
      setHidePassword(true);
    }
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error) {
          let error = "Internet issues or wrong credentials!";
          setServerErr(error);
        }
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
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("email")}
              id="email"
              type="email"
              placeholder={`${currentUser ? currentUser.email : "Email"}`}
              className=" mb-3  
              border-none          
              outline-none
              w-[100%] h-[98%]  
              text-[#000] text-[14px] lg:text-[18px] 
              p-[13px] 
              "
              disabled={currentUser}
            />

            <FaAt className="text-[#888988]" />
          </div>
          <p className="text-[red]">{errors.email?.message}</p>
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
              {...register("password")}
              id="password"
              type={`${hidePassword ? "password" : "text"}`}
              placeholder="Password"
              className=" mb-6  
              border-none          
              outline-none
              w-[100%] h-[98%]  
              text-[#000] text-[14px] lg:text-[18px] 
              p-[13px] 
              "
              disabled={currentUser}
            />

            <div onClick={handleShowPassword}>
              <FaEye
                className={`${
                  hidePassword ? "block" : "hidden"
                } text-[#888988]`}
              />
              <FaEyeSlash
                className={`${
                  hidePassword ? "hidden" : "block"
                } text-[#888988]`}
              />
            </div>
          </div>
          <p className="text-[red]">{errors.password?.message}</p>
          <button
            type="submit"
            className="w-full less_sm:w-[50%] h-[40px] less_sm:h-[45px] 
            rounded-lg bg-dark-purple hover:bg-dark-purp-hover text-sm sm:md text-white mt-8 "
            disabled={currentUser}
          >
            SIGN IN
          </button>
          <p className="text-[0.9rem] text-[red]">{serverErr}</p>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
