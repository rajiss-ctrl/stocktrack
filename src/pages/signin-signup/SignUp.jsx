import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import db, { auth, useAuth } from "../../db/firebase";
import FormInput from "../../components/FormInput";
import {
  FaEye,
  FaEyeSlash,
  FaPeopleArrows,
  FaRegEnvelope,
} from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [serverErr, setServerErr] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => {
    setHidePassword((pre) => !pre);
  };
  const currentUser = useAuth();
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      errMessages: "Business Name should not be nore than 20 character long",
      placeholder: `${currentUser ? currentUser.email : "Business Name"} `,
      label: "Name",
      icon: <FaPeopleArrows />,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      errMessages: "Business email should be a valid email address!",
      placeholder: `${currentUser ? currentUser.email : "Email Address"} `,
      label: "Email",
      icon: <FaRegEnvelope />,
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: hidePassword ? "password" : "text",
      errMessages:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      placeholder: "Password",
      label: "Password",
      icon: hidePassword ? <FaEyeSlash /> : <FaEye />,
      // pattern: `^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$`,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: hidePassword ? "password" : "text",
      errMessages: "Password don't match",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      icon: hidePassword ? <FaEyeSlash /> : <FaEye />,
      pattern: values.password,
      required: true,
    },
  ];

  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();
    if (!hidePassword) {
      setHidePassword((pre) => !pre);
    }
    const email = values.email;
    const name = values.name;
    const password = values.password;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      navigate("/dashboard");
    } catch (err) {
      if (err) {
        let err = "Internet problem";
        setServerErr(err);
      }
      // console.error(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <main
      id="signup"
      className="w-full  md:w-2/3  h-auto lg:h-96  flex flex-col items-center justify-center mt-[60px] "
    >
      <div className="w-[95%]  rounded-md md:w-[80%] p-[10px] less_sm:p-[20px] shadow-lg bg-[#eceff1]">
        <p className="leading-6 pt-2 text-[#000000] sm:text-sm">Sign Up Here</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={registerWithEmailAndPassword}
        >
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                hidePassword={hidePassword}
                handleShowPassword={handleShowPassword}
              />
            );
          })}
          <button
            type="submit"
            className="w-full less_sm:w-[50%] h-[40px] less_sm:h-[45px] 
                mt-4 shadow   rounded-lg bg-[#46158B] hover:bg-dark-purp-hover text-sm  text-white"
            disabled={currentUser}
          >
            SIGN UP
          </button>
          <p className="text-[red]">{serverErr}</p>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
