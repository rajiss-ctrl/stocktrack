import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const StockInput = (props) => {
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
        // onFocus={() =>
        //   inputProps.name === "confirmPassword" && setFocused(true)
        // }
        focused={focused.toString()}
        className=" p-3 text-sm w-full  border outline-none mb-6 rounded"
      />
      <span className="text-[#fb8a8a] text-[14px] hidden">{errMessages}</span>
    </div>
  );
};

export default StockInput;
