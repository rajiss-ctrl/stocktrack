import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import db, { storage } from "../../db/firebase";
const Editbuz = ({ showEdit, handleBuzProfileEdit, open }) => {
  const buzData = useSelector((store) => store.buz.buzProfileData);

  const [buz, setBuz] = useState("");
  const [address, setAddress] = useState("");

  const handleUpdate = async (id) => {
    const taskDocRef = doc(db, "businesses", id);
    setBuz("");
    setAddress("");
    try {
      await updateDoc(taskDocRef, {
        businessName: buz,
        businessAddress: address,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className={`z-[4] p-[30px] text-sm sm:text-[1rem] absolute ${
        !open ? "lg:left-72" : "lg:left-32"
      } duration-300  w-[90%] sm:w-[60%] lg:w-[30%] top-[60px] lg:top-[80px] shadow-lg rounded-md bg-[#FFFFFF]`}
    >
      {buzData?.map((item) => {
        return (
          <div
            key={item.id}
            className="  flex justify-center items-center flex-col"
          >
            <img
              className="w-[30px] h-[30px] rounded-[50%] mb-[15px]"
              src={item.logo}
              alt=""
            />
            <h1 className="my-3 text-[1.0rem] leading-3 font-[600]">
              Update Business Profile
            </h1>
            <input
              type="text"
              className="w-full mb-3 
                  outline-[0] border border-gray-400 
                  rounded-md  h-[40px] 
                  text-[#808080] text-sm 
                  font-[400] p-4 mt-3
                  "
              placeholder={`Edit ${item.businessName} Buz Name?`}
              onChange={(e) => setBuz(e.target.value)}
            />
            <input
              type="text"
              className="w-full mb-3 border border-gray-400
                        outline-[0]
                        rounded-[8px]  h-[40px] 
                        text-[#808080] text-sm 
                        font-[400] p-4 mt-3 
                        "
              placeholder={`Edit Business Address`}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex gap-[20px] w-[100%]">
              <button
                onClick={handleBuzProfileEdit}
                className="border border-[1px solid] border-[rgb(255,_101,_132)] text-[rgb(255,_101,_132)] rounded-[4px] p-[4px_10px]"
              >
                Close
              </button>
              <button
                onClick={() => handleUpdate(item?.id)}
                className="bg-dark-purple text-white rounded-[4px] p-[4px_10px]"
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Editbuz;
