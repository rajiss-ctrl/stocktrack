import { doc, updateDoc } from "firebase/firestore";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import db from "../../db/firebase";

const initialState = {
  stockQty: Number(0),
  stockPrice: Number(0),
  stockPackSize: "",
  stockDesc: "",
};

const UpdateStockState = ({ id, qty, price, des, siz, handleStockStateUpdateModal, handleDeleteItem, stockState, index }) => {
  const [data, setData] = useState(initialState);
  const [delModal, setDelModal] = useState(false);

  const inputData = [
    {
      id: 1,
      name: "product_Qty",
      type: "number",
      errMessages: "Please provide the product quantity.",
      successMessage: "Acknowledged compliance for product quantity.",
      placeholder: `Stock: ${stockState === index && qty} ${stockState === index && siz}${qty <= 1 ? "" : "s"} `,
      label: "Product Quantity",
      required: true,
    },
    {
      id: 2,
      name: "product_Price",
      type: "number",
      errMessages: "Please enter a valid number for product price.",
      successMessage: "Acknowledged compliance for product Price.",
      placeholder: `Cost: ₦${stockState === index && price}`,
      label: "Product Price",
      required: true,
    },
    {
      id: 3,
      name: "product_description",
      type: "text",
      errMessages: "Please provide a description for the product.",
      placeholder: `${stockState === index && des}`,
      label: "Product Description",
      required: false,
    },
  ];

  const onChange = (e) => {
    const newValue = e.target.value; // Trim whitespace
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.name === 'stockQty' || e.target.name === 'price' || e.target.name === 'dex' || e.target.name === 'size' ?
        newValue === '' ? prevState[e.target.name] : newValue : newValue
    }));
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const newFields = {
      ...data,
      dateStamp: new Date().toISOString(),  // Add the date stamp field
    };
    const taskDocRef = doc(db, "stock", id);
    try {
      console.log("Updating with:", newFields);
      console.log("Data:", data);
      await updateDoc(taskDocRef, newFields);
    } catch (err) {
      alert(err);
    }
    setData(initialState);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click event propagation
  };

  const showDelModal = (e) => {
    e.preventDefault();
    setDelModal(prev => !prev);
  };

  const ConfirmDel = ({ handleDeleteItem }) => {
    return (
      <div className=" flex items-center gap-1">
        <button onClick={(e) => { handleDeleteItem(e, id) }} className="bg-[red] active:bg-[#2e0a61] shadow hover:shadow-lg text-center w-[35px] h-[35px] p-2 text-white rounded-[50%]">
          <FaTrash />
        </button>
        <button onClick={showDelModal} className="bg-white outline-0 border text-center border-gray-400 text-[green] w-[35px] h-[35px] p-2 rounded-2xl">
          <FaTimes />
        </button>
      </div>
    );
  };

  return (
    <div className="m-0 min-h-[200px] w-[230px] z-50 bg-[#c3c3c3] p-2 text-xs" onClick={handleClick}>
      <form className=" flex flex-col">
        {inputData.map((input) => (
          <input
            key={input.id}
            type={input.type}
            value={data[input.name]} // Ensure correct name attribute
            name={input.name} // Set name attribute to match the state key
            className={`${input.name === "product_description" ? "hidden lg:block" : "block"} placeholder-text-color text-xs px-2 py-[0.20rem] border-0 shadow-md outline-none  sm:text-sm w-full mb-2 rounded`}
            onChange={onChange}
            placeholder={input.placeholder}
          />
        ))}

        <select
          className="signup__form-input select w-full h-[30px] md:h-[35px] text-[0.65rem] bg-gray rounded px-2 py-0 border-0 shadow-md outline-none  mb-2 form-select text-gray-500"
          name="size" // Specify the name of the select input
          value={data.size}
          required
          onChange={onChange}
        >
          <option className="uppercase" defaultValue>
            {!siz ? "Choose packaging size" : siz}{qty <= 1 ? "" : "s"}
          </option>
          <option>Pack</option>
          <option>Carton</option>
          <option>Piece</option>
          <option>Sachet</option>
          <option>Bag</option>
        </select>

        <button onClick={(e) => { handleUpdate(e, id, qty); handleStockStateUpdateModal(e, index); }} className="flex items-center justify-center outline-none shadow-lg h-[35px] px-3 bg-green-500 rounded-md font-bold text-[0.65rem] text-white mb-2">
          <FaCheck /> <span>update</span>
        </button>
        <button onClick={(e) => { showDelModal(e, id) }} className="outline-none shadow-lg h-[35px] px-3 bg-black font-bold text-[0.65rem] rounded-md text-white">Del Product</button>
        <div className={`${!delModal ? "hidden" : "block"} absolute top-[60%] right-[35%]`}>
          <ConfirmDel handleDeleteItem={handleDeleteItem} />
        </div>
      </form>
    </div>
  );
};

export default UpdateStockState;
