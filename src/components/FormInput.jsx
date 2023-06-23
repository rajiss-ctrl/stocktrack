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
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        className=" 
             border-b-[1px] border-[#191c1a]          
            outline-none mb-3
            w-[100%] h-[80%]  
            text-[#000] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
      />
      <span className="text-[#fb8a8a] text-[14px] hidden">{errMessages}</span>
    </div>
  );
};

export default FormInput;
