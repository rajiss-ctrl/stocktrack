import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { auth } from "../../db/firebase";
import FormInput from "../../components/FormInput";
import { FaAt, FaEye } from "react-icons/fa";

const SignUp = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      errMessages: "Business email should be a valid email address!",
      placeholder: "Business Email",
      label: "Email",
      icon: <FaAt />,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      errMessages:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      placeholder: "Password",
      label: "Password",
      icon: <FaEye />,
      pattern: `^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$`,
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      errMessages: "Password don't match",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      icon: <FaEye />,
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
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
    setValues(initialState);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <main className="w-full  flex flex-col items-center justify-center mt-[60px] ">
      <div className="w-[95%] md:w-[80%] p-[10px] less_sm:p-[20px] bg-[#ffffff]">
        <p className="text-[#000007] text-[18px]">Register here</p>
        <form
          className="w-full flex flex-col items-center justify-center mt-[20px]"
          onSubmit={handleSubmit}
        >
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
          <button
            type="submit"
            className="w-[100%] less_sm:w-[50%] h-[40px] less_sm:h-[45px] 
                    rounded mt-[10px] shadow-lg 
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

export default SignUp;