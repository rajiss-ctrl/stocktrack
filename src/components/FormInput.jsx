import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocused = (e) => {
    setFocused(true);
  };
  const { label, id, onChange, errMessages, ...inputProps } = props;
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
        className="w-[100%] mb-3  
            border border-[#e7e6e6]           
            outline-[0] border-[none] 
            rounded less_sm:rounded-[8px] w-[100%] h-[42px] sm:h-[54px] 
            text-[#808080] text-[14px] lg:text-[18px] 
            p-[13px] 
            "
      />
      <span className="text-[#fb8a8a] text-[14px] hidden">{errMessages}</span>
    </div>
  );
};

export default FormInput;
