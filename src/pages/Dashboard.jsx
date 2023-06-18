import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link, Outlet } from "react-router-dom";

import { useToggle } from "../custom-hooks/useToggle";
import Sidebar from "../components/Sidebar";

import Editbuz from "./pages-components/Editbuz";

import { BsArrowLeftShort } from "react-icons/bs";
import db, { useAuth } from "../db/firebase";
import DashboardTable from "./pages-components/DashboardTable";
import { fetchAsyncUsers } from "../features/userSlice";
// https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane

const Dashnoard = () => {
  const [isVisible, toggle] = useToggle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);

  const [newStock, setNewStock] = useState(Number(0));
  const [stockEdit, setStockEdit] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(-1);
  //for business profile edit
  const [showEdit, setShowEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleBuzProfileEdit = () => {
    setShowEdit((pre) => !pre);
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
    <div
      className={` min-h-[800px] sm:min-h-[1200px] lg:min-h-[900px] bg-gradient-to-r from-white to-[rgb(8,_26,_81,_0.3)] bg-clip  relative flex`}
    >
      {showEdit ? (
        <div
          className={`${
            showEdit && "bg-[rgba(82,56,56,0.5)] lg:bg-transparent lg:z-10 z-50"
          } absolute w-[100%]  flex justify-center items-center h-full`}
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
        } h-[600px] z-50 lg:h-[800px] mb-2 duration-300  bg-dark-purple absolute top-0 left-0 lg:relative`}
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
          handleBuzProfileEdit={handleBuzProfileEdit}
          handleOpen={handleOpen}
          open={open}
          setOpen={setOpen}
          isVisible={isVisible}
        />
      </div>

      <DashboardTable
        handleEdit={handleEdit}
        showPrompt={showPrompt}
        stockEdit={stockEdit}
        handleAddItem={handleAddItem}
        setNewStock={setNewStock}
        handleMinus={handleMinus}
        newStock={newStock}
        open={open}
        handleDeleteItem={handleDeleteItem}
        handleConfirmPromt={handleConfirmPromt}
      />
    </div>
  );
};

export default Dashnoard;
