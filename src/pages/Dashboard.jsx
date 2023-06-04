import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { db } from "../db/firebase";

import { useToggle } from "../custom-hooks/useToggle";
import Sidebar from "../components/Sidebar";
import StockEdit from "../components/StockEdit";
import ConfirmPrompt from "../components/ConfirmPrompt";
import Notification from "../components/Notification";
import Editbuz from "./pages-components/Editbuz";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardBar from "../components/DashboardBar";
import { BsArrowLeftShort } from "react-icons/bs";
// https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane

const Dashnoard = () => {
  const [isVisible, toggle] = useToggle();

  const user = useSelector((state) => state.user.user);
  const product = useSelector((store) => store.product.productData);

  const [newStock, setNewStock] = useState(Number(0));
  const [stockEdit, setStockEdit] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(-1);
  //for business profile edit
  const [showEdit, setShowEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleBuzProfileEdit = () => {
    setShowEdit(!showEdit);
  };
  // function to add to stcok
  const handleMinus = async (id, qty) => {
    setNewStock(0);
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
    setNewStock(0);
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
    setNewStock("");
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
  // open and close sidebar
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="min-h-[800px] sm:min-h-[1200px] lg:min-h-[900px] bg-[#f6f6f6] relative flex">
      {showEdit ? (
        <div
          className={`${
            showEdit &&
            "bg-[rgb(000,_000,_000,_0.5)] lg:bg-transparent lg:z-10 z-50"
          } absolute w-[100%]  flex justify-center items-center h-[100vh]`}
        >
          <Editbuz
            showEdit={showEdit}
            handleBuzProfileEdit={handleBuzProfileEdit}
            open={open}
          />
        </div>
      ) : (
        <></>
      )}

      <div
        className={`${
          open
            ? "right-[100rem] lg:w-20 duration-300 "
            : " w-[60%] less_sm:w-[40%] lg:w-72 duration-300"
        } h-[600px] lg:h-[800px] mb-2 duration-300  bg-dark-purple absolute top-0 left-0 lg:relative`}
      >
        <div
          onClick={handleOpen}
          className={`${
            open ? "-right-4 duration-300" : " -right-3 duration-300"
          } cursor-pointer z-40  absolute top-8 shadow `}
        >
          <BsArrowLeftShort
            className={`bg-white ${
              open && "rotate-180"
            } text-3xl rounded-full border border-dark-purple text-dark-purple`}
          />
        </div>
        <Sidebar
          user={user}
          handleBuzProfileEdit={handleBuzProfileEdit}
          handleOpen={handleOpen}
          open={open}
          setOpen={setOpen}
          isVisible={isVisible}
        />
      </div>

      <div
        className={`${
          open ? "w-full lg:w-[95%] " : "w-full lg:w-[90%]"
        } px-[5%] z-[5px]`}
      >
        <DashboardBar />

        <h1 className="font-[Kumbh Sans, sans-serif] font-[600] text-2xl text-dark-purple m-[10px_0]">
          Dashboard
        </h1>

        <div className="  mt-[0] md:mt-[30px] w-full ">
          <Notification />
        </div>

        {product.length === 0 ? (
          <h1 className="text-[#2c5b2c] text-sm md:text-lg">
            Welcome <span className="text-[red]">{user.email}</span>! Navigate
            To{" "}
            <Link className="text-[blue]" to="/updatestock">
              {" "}
              Stock update
            </Link>{" "}
            to stock your products and click on left top logo icon to update
            your business profile.
          </h1>
        ) : (
          <table className="static lg:relative lg:z-[5px] w-[100%] p-[30px] mt-20 ">
            <thead className="shadow-md rounded h-[40px] sm:h-[50px] bg-white">
              <tr>
                <th
                  className=" font-[Kumbh Sans, sans-serif] 
                 text-white bg-dark-purple shadow-xl 
                text-sm sm:text-xl font-[800]"
                >
                  ITEM
                </th>
                <th className="shadow-xl text-sm sm:text-xl text-white bg-[#f7c100] font-[800] ">
                  QUANTITY
                </th>
                <th className="shadow-xl text-sm sm:text-xl text-white bg-[#f82e2e] font-[800] ">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-[1rem]">
              {product.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className=" shadow-md cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded h-[40px] sm:h-[50px] bg-white"
                  >
                    <td className="  pl-[15px] text-sm font-[600]">
                      {item?.product_name.toUpperCase()}
                    </td>
                    <td className="font-[600]  pl-[15px] text-xl ">
                      {Number(item?.product_Qty)}{" "}
                      <span>
                        {item?.product_Qty <= 1 ? (
                          <span className="text-xs">
                            {item?.size.toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-xs">
                            {item?.size.toUpperCase()}s
                          </span>
                        )}
                      </span>
                    </td>
                    <td className=" font-[Kumbh Sans, sans-serif] font-600">
                      <div className="flex justify-between">
                        <button
                          onClick={() => handleEdit(index)}
                          className="w-[50%] cursor-pointer flex justify-center items-center  text-[green]"
                        >
                          <FaEdit />
                        </button>
                        <div className="cursor-pointer w-[50%] flex justify-center items-center  text-[red]">
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
                        } absolute w-[90%] lg:w-[40%] top-[20px] right-[10px] md:right-[0] bg-[#ffffff] shadow`}
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
        <Outlet />
      </div>
    </div>
  );
};

export default Dashnoard;
