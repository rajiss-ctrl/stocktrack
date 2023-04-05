import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { db } from "../db/firebase";
import Logo from "../assets/images/default-logo.png";
import { useToggle } from "../custom-hooks/useToggle";
import Sidebar from "../components/Sidebar";
import StockEdit from "../components/StockEdit";
import ConfirmPrompt from "../components/ConfirmPrompt";
import Notification from "../components/Notification";
import Editbuz from "./pages-components/Editbuz";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
// https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane

const Dashnoard = () => {
  const [isVisible, toggle] = useToggle();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const product = useSelector((store) => store.product.productData);
  const buzData = useSelector((store) => store.buz.buzProfileData);

  const [proData, setProData] = useState([]);
  const [newStock, setNewStock] = useState(Number(0));
  const [stockEdit, setStockEdit] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(-1);
  //for business profile edit
  const [showEdit, setShowEdit] = useState(false);
  const handleBuzProfileEdit = () => {
    setShowEdit(!showEdit);
  };
  // function to add to stcok
  const handleMinus = async (id, qty) => {
    const newFileds = { product_Qty: Number(qty) - Number(newStock) };
    const taskDocRef = doc(db, "stock", id);
    try {
      await updateDoc(taskDocRef, newFileds);
    } catch (err) {
      alert(err);
    }
  };
  // function to minus to stcok
  const handleAddItem = async (id, qty) => {
    const newFileds = { product_Qty: Number(qty) + Number(newStock) };
    const taskDocRef = doc(db, "stock", id);
    try {
      await updateDoc(taskDocRef, newFileds);
    } catch (err) {
      alert(err);
    }
  };
  // delete from stock
  const handleDeleteItem = async (id) => {
    const taskDocRef = doc(db, "stock", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  //open prompt for edit stock

  const handleEdit = (index) => {
    if (stockEdit === index) {
      setStockEdit(-1);
      return;
    }
    setStockEdit(index);
  };
  const handleConfirmPromt = (index) => {
    if (showPrompt === index) {
      setShowPrompt(-1);
      return;
    }
    setShowPrompt(index);
  };

  return (
    <div className=" relative flex">
      {/* Side bar toggle */}
      <div
        onClick={toggle}
        className={`${
          isVisible ? "left-[0px]" : "hidden"
        } fixed text-[green] text-[18px] block md:hidden shadow`}
      >
        <FaArrowCircleRight />
      </div>
      <div
        onClick={toggle}
        className={`${
          isVisible ? "hidden" : "left-[90px]"
        } text-[red] fixed text-[18px] block md:hidden shadow `}
      >
        <FaArrowCircleLeft />
      </div>
      {showEdit ? (
        <div
          className={` absolute w-[100%] flex justify-center items-center h-[100vh]`}
        >
          <Editbuz handleBuzProfileEdit={handleBuzProfileEdit} />
        </div>
      ) : (
        <></>
      )}

      {/* If the user had not update his profile the sidebar should look like this */}
      <div
        className={`${
          isVisible ? "hidden" : "block"
        } fixed z-[6] top-[0] md:static  w-[90px] md:w-[200px] bg-[rgb(255,_101,_132)] min-h-[500px] md:h-[100vh]`}
      >
        {buzData.length === 0 ? (
          <div className="w-[100%] flex flex-col justify-center items-center mt-[15px] text-[#ffffff] hover:text-[#e0d7d7]">
            <Link to="businessprofile">
              <h1 className="text-center text-[10px] md:text-[12px]">
                Update Business Profile
              </h1>
              <div className="flex justify-center items-center">
                <img
                  className="drop-shadow-[7px_5px_3px_red] w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-[50%]"
                  src={Logo}
                  alt="profile"
                />
              </div>
            </Link>
          </div>
        ) : (
          //  when the user had updated the business profile the sidebar should have this
          buzData.map((item) => {
            return (
              <div key={item.id} className=" flex flex-col">
                <Sidebar
                  item={item}
                  user={user}
                  handleBuzProfileEdit={handleBuzProfileEdit}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="w-[100%] md:w-[80%] px-[5%]">
        <div className="p-[10px_10px] md:p-[20px_20px] mt-[0] md:mt-[30px] w-[100%] md:w-[45%] ">
          <Notification />
        </div>
        <h1 className="m-[10px_0]">Inventory Management</h1>
        {product.length === 0 ? (
          <h1 className="text-[green]">
            Welcome <span className="text-[red]">{user.email}</span>! Navigate
            To update store to stock your products.
          </h1>
        ) : (
          <table className="static md:relative w-[100%] p-[30px] border border-[rgb(255,_101,_132)]  border-solid">
            <thead className="border border-[rgb(255,_101,_132)]  border-solid">
              <tr>
                <th className="border border-[rgb(255,_101,_132)]  border-solid">
                  Name
                </th>
                <th className="border border-[rgb(255,_101,_132)]  border-solid">
                  Quantity
                </th>
                <th className="border border-[rgb(255,_101,_132)]  border-solid">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => {
                return (
                  <tr key={item.id} className="">
                    <td className="pl-[15px] border border-[rgb(255,_101,_132)]  border-solid">
                      {item?.product_name}
                    </td>
                    <td className="pl-[15px] border border-[rgb(255,_101,_132)]  border-solid">
                      {Number(item?.product_Qty)}
                    </td>
                    <td className=" border border-[rgb(255,_101,_132)]  border-solid">
                      <div className="flex justify-between">
                        <button
                          onClick={() => handleEdit(index)}
                          className="w-[50%] bg-[green] text-[#ffffff]"
                        >
                          <FaUpload />
                        </button>
                        <div className="cursor-pointer w-[50%] flex justify-center items-center bg-[black] text-[#ffffff]">
                          <span onClick={() => handleConfirmPromt(index)}>
                            <FaTrash />
                          </span>
                          <div
                            className={`${
                              showPrompt === index ? "block" : "hidden"
                            } absolute w-[150px] top-[20px] right-[7px] md:right-[0] bg-[#ffffff] shadow`}
                          >
                            <ConfirmPrompt
                              item={item}
                              index={index}
                              handleConfirmPromt={handleConfirmPromt}
                              handleDeleteItem={handleDeleteItem}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${
                          stockEdit === index ? "block" : "hidden"
                        } absolute w-[80%] md:w-[28%] top-[20px] right-[15px] md:right-[0] bg-[#ffffff] shadow`}
                      >
                        <StockEdit
                          handleAddItem={handleAddItem}
                          handleMinus={handleMinus}
                          handleEdit={handleEdit}
                          setNewStock={setNewStock}
                          newStock={newStock}
                          item={item}
                          index={index}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {/* <form onSubmit={event => {
        event.preventDefault();
        handleAddItem({
          name: event.target.name.value,
          quantity: parseInt(event.target.quantity.value)
        });
      }}> */}

        <Outlet />
      </div>
    </div>
  );
};

export default Dashnoard;
