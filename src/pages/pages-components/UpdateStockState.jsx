import { doc, updateDoc } from "firebase/firestore";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import db from "../../db/firebase";

const initialState = {
  stockQty: 0,
  stockPrice: 0,
  stockPackSize: "",
  stockDesc: "",
};

const UpdateStockState = ({
  id,
  qty,
  price,
  des,
  siz,
  handleStockStateUpdateModal,
  handleDeleteItem,
  stockState,
  index,
}) => {
  const [data, setData] = useState(initialState);
  const [delModal, setDelModal] = useState(false);

  const inputData = [
    {
      id: 1,
      name: "product_Qty",
      type: "number",
      placeholder: `Stock: ${stockState === index ? qty : ""} ${
        stockState === index && siz
      }${qty <= 1 ? "" : "s"}`,
      label: "Product Quantity",
      required: true,
    },
    {
      id: 2,
      name: "product_Price",
      type: "number",
      placeholder: `Cost: ₦${stockState === index ? price : ""}`,
      label: "Product Price",
      required: true,
    },
    {
      id: 3,
      name: "product_description",
      type: "text",
      placeholder: `${stockState === index ? des : ""}`,
      label: "Product Description",
      required: false,
    },
  ];

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newFields = {
      ...data,
      dateStamp: new Date().toISOString(),
    };
    const taskDocRef = doc(db, "stock", id);
    try {
      await updateDoc(taskDocRef, newFields);
    } catch (err) {
      alert(err);
    }
    setData(initialState);
  };

  const showDelModal = (e) => {
    e.preventDefault();
    setDelModal((prev) => !prev);
  };

  const ConfirmDel = ({ handleDeleteItem }) => (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => handleDeleteItem(e, id)}
        className="bg-red-500 hover:bg-red-600 shadow text-white rounded-full p-2"
      >
        <FaTrash />
      </button>
      <button
        onClick={showDelModal}
        className="bg-gray-200 hover:bg-gray-300 text-green-500 border border-gray-300 rounded-full p-2"
      >
        <FaTimes />
      </button>
    </div>
  );

  return (
    <div
      className="min-h-[200px] w-[260px] bg-white shadow-md rounded-md p-4 text-sm relative z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <form className="flex flex-col gap-3">
        {inputData.map((input) => (
          <div key={input.id} className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold text-xs">
              {input.label}
            </label>
            <input
              type={input.type}
              value={data[input.name] || ""}
              name={input.name}
              className="text-sm border border-gray-300 rounded-md p-2 shadow focus:ring-2 focus:ring-green-400 focus:outline-none"
              onChange={onChange}
              placeholder={input.placeholder}
              required={input.required}
            />
          </div>
        ))}

        <select
          className="text-sm border border-gray-300 rounded-md p-2 shadow focus:ring-2 focus:ring-green-400 focus:outline-none"
          name="size"
          value={data.size}
          onChange={onChange}
          required
        >
          <option value="" disabled>
            {siz || "Choose packaging size"}
          </option>
          <option value="Pack">Pack</option>
          <option value="Carton">Carton</option>
          <option value="Piece">Piece</option>
          <option value="Sachet">Sachet</option>
          <option value="Bag">Bag</option>
        </select>

        <button
          onClick={(e) => {
            handleUpdate(e);
            handleStockStateUpdateModal(e, index);
          }}
          className="flex items-center justify-center bg-green-500 text-white font-bold rounded-md py-2 shadow hover:bg-green-600"
        >
          <FaCheck className="mr-2" /> Update
        </button>
        <button
          onClick={showDelModal}
          className="bg-gray-800 text-white font-bold rounded-md py-2 shadow hover:bg-gray-900"
        >
          Delete Product
        </button>
        {delModal && (
          <div className="absolute top-16 right-10 bg-white p-4 shadow-lg rounded-md">
            <ConfirmDel handleDeleteItem={handleDeleteItem} />
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateStockState;
