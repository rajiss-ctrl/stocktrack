import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const StockInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocused = () => {
    setFocused(true);
  };

  const { label, icon, id, onChange, errMessages, type, ...inputProps } = props;

  return (
    <div className="w-full">
      <input
        {...inputProps}
        type={type}
        value={inputProps.value || ""}  
        onChange={onChange}
        onBlur={handleFocused}
        focused={focused.toString()}
        className="p-3 text-sm w-full border outline-none mb-4 rounded"
      />
      <span className="text-[#fb8a8a] text-xs pb-2 hidden">{errMessages}</span>
    </div>
  );
};

export default StockInput;
