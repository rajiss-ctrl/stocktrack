import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocused = (e) => {
    setFocused(true);
  };
  const { label, icon, id, onChange, errMessages, ...inputProps } = props;
  return (
    <div className="w-full">
      {/* <div
        className=" relative
             border-b-[1px] border-[#002c12]           
            outline-none
            w-[100%] h-[42px] sm:h-[54px] 
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
      > */}
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        className=" 
             border-b-[1px] border-[#93b4a1]          
            outline-none
            w-[100%] h-[80%]  
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
      />
      <span className="text-[#fb8a8a] text-[14px] hidden">{errMessages}</span>
      {/* </div> */}
      {/* <span className="absolute top-[20px] right-[0]">{icon}</span> */}
    </div>
  );
};

export default FormInput;
