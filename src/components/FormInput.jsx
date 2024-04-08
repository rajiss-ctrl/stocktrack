import React, { useState } from "react";
import { useAuth } from "../db/firebase";
const FormInput = (props) => {
  const currentUser = useAuth();
  const [focused, setFocused] = useState(false);
  const handleFocused = (e) => {
    setFocused(true);
  };
  const {
    hidePassword,
    handleShowPassword,
    label,
    icon,
    id,
    onChange,
    errMessages,
    ...inputProps
  } = props;
  return (
    <div className="w-full  relative">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        disabled={currentUser}
        focused={focused.toString()}
        className="
             border-b-[1px] border-0          
            outline-none mb-5 rounded
            w-[100%] h-[80%]  
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] shadow
            "
      />
      <span
        onClick={handleShowPassword}
        className="absolute text-[#888988] cursor-pointer right-[10px] top-[15px]"
      >
        {icon}
      </span>
      <span className="text-[#fb8a8a] text-[14px] hidden">{errMessages}</span>
    </div>
  );
};

export default FormInput;
