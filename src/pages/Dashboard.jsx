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
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaBars,
  FaEdit,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import DashboardBar from "../components/DashboardBar";
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
  const [open, setOpen] = useState(false);
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
  // open and close sidebar
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="min-h-[600px] bg-[#f6f6f6] relative flex">
      {/* SideBar Items */}

      {/* {showEdit ? (
        <div
          className={` absolute w-[100%] flex justify-center items-center h-[100vh]`}
        >
          <Editbuz handleBuzProfileEdit={handleBuzProfileEdit} />
        </div>
      ) : (
        <></>
      )} */}

      {/* If the user had not update his profile the sidebar should look like this */}
      {/* <div
        className={`${
          isVisible ? "hidden" : "block"
        } fixed z-[6] top-[0] md:static  
        w-[120px] less_sm:w-[180px] lg:w-[200px]  
        bg-[#000904]  
        `}
      >
        {buzData.length === 0 ? (
          <div className="w-[100%] h-[600px] flex flex-col items-center mt-[15px] text-[#ffffff] hover:text-[#e0d7d7]">
            <div
              onClick={toggle}
              className={`${
                isVisible ? "hidden" : "block"
              } text-[#ffffff] fixed top-[5px] 
        left-[98px] less_sm:left-[158px] 
        text-[18px] z-[8] block md:hidden shadow `}
            >
              <FaArrowCircleLeft />
            </div>

            <Link to="businessprofile">
              <h1 className="text-center p-2 md:text-[18px]">
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
        ) : ( */}
      {/* when the user had updated the business profile the sidebar should have this */}
      {/* buzData.map((item) => {
          return (
             <div key={item.id} className=" flex flex-col">
               <Sidebar
                 item={item}
                 user={user}
                 handleBuzProfileEdit={handleBuzProfileEdit}
                   toggle={toggle}
               isVisible={isVisible}
                 />
               </div>
             );
           })
         )}
       </div> */}

      {showEdit ? (
        <div
          className={` absolute w-[100%] flex justify-center items-center h-[100vh]`}
        >
          <Editbuz handleBuzProfileEdit={handleBuzProfileEdit} />
        </div>
      ) : (
        <></>
      )}

      <div
        className={`${
          open ? " md:w-20" : " w-[60%] md:w-72"
        } h-[100%] absolute top-0 left-0 md:static`}
      >
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
          open ? "w-full md:w-[95%]" : "w-full md:w-[90%]"
        }  px-[5%]`}
      >
        <DashboardBar />

        <div className="  mt-[0] md:mt-[30px] w-full ">
          <Notification />
        </div>
        <h1 className="font-[Kumbh Sans, sans-serif] font-[600] tracking-wide text-lg text-dark-purple m-[10px_0]">
          Dashboard
        </h1>
        {product.length === 0 ? (
          <h1 className="text-[green]">
            Welcome <span className="text-[red]">{user.email}</span>! Navigate
            To update store to stock your products.
          </h1>
        ) : (
          <table className="static md:relative w-[100%] p-[30px] ">
            <thead className="shadow-md rounded h-[40px] sm:h-[50px] bg-white">
              <tr>
                <th
                  className=" font-[Kumbh Sans, sans-serif] 
                 text-[#FFFFFF] bg-[#c2bdbd] shadow-xl 
                text-sm sm:text-lg font-[800]"
                >
                  Items
                </th>
                <th className="shadow-xl text-sm sm:text-lg text-[#FFFFFF] bg-[#b9cfb9] font-[800] ">
                  Quantity
                </th>
                <th className="shadow-xl text-sm sm:text-lg text-[#FFFFFF] bg-[#f6c3c3] font-[800] ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-[1rem]">
              {product.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className=" shadow-md hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded h-[40px] sm:h-[50px] bg-white"
                  >
                    <td className=" font-[00] pl-[15px] text-sm sm:text-[1rem]  font-600">
                      {item?.product_name}
                    </td>
                    <td className="font-[400]  pl-[15px] text-sm sm:text-[1rem] font-600">
                      {Number(item?.product_Qty)}{" "}
                      <span>
                        {item?.product_Qty <= 1 ? (
                          <span>{item?.size}</span>
                        ) : (
                          <span>{item?.size}s</span>
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
