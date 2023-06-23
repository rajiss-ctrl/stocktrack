import React from "react";
import { useSelector } from "react-redux";
import DashboardBar from "../../components/DashboardBar";
import Notification from "../../components/Notification";
import { Link, Outlet } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmPrompt from "../../components/ConfirmPrompt";
import StockEdit from "../../components/StockEdit";
import { useAuth } from "../../db/firebase";

const DashboardTable = ({
  handleEdit,
  handleConfirmPromt,
  showPrompt,
  handleDeleteItem,
  stockEdit,
  handleAddItem,
  handleMinus,
  setNewStock,
  newStock,
  open,
}) => {
  const product = useSelector((store) => store.product.productData);
  const currentUser = useAuth();

  // const users = useSelector((state) => state.user);
  // console.log(users.user);
  return (
    <div
      className={`${
        open ? "w-full lg:w-[95%] " : "w-full lg:w-[90%]"
      } px-[5%] pb-12 z-[5px]`}
    >
      <DashboardBar />

      <h1 className="font-[Kumbh Sans, sans-serif] text-2xl text-dark-purple m-[10px_0]">
        Dashboard
      </h1>

      <div className="  mt-[0] md:mt-[30px] w-full ">
        <Notification />
      </div>

      {product.length === 0 ? (
        <h1 className="text-[#2c5b2c] text-sm md:text-lg">
          Welcome <span className="text-[red]">{currentUser?.email}</span>!
          Navigate To{" "}
          <Link className="text-[blue]" to="/updatestock">
            {" "}
            Stock update
          </Link>{" "}
          to stock your products and click on left top logo icon to update your
          business profile.
        </h1>
      ) : (
        <table className="relative lg:z-[5px] w-[100%] p-[30px] mt-20 ">
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
              <th className="shadow-xl text-sm sm:text-xl text-white bg-dark-purple font-[800] ">
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
                  <td className="  pl-[15px] md:text-[.7rem] text-sm md:leading-4 text-black font-[600]">
                    {item?.product_name.toUpperCase()}
                  </td>
                  <td className="font-[600]  pl-[15px] text-xl ">
                    {Number(item?.product_Qty)}{" "}
                    <span className="font-[400]">
                      {item?.product_Qty <= 1 ? (
                        <span className="text-[.6rem] leading-[1rem]">
                          {item?.size.toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-[.6rem] leading-[1rem]">
                          {item?.size.toUpperCase()}S
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
                          } absolute w-[150px]  top-[50%] lg:top-[20px] right-[7px] md:right-[0] bg-[#ffffff] shadow-2xl`}
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
                      } absolute w-full md:w-[50%] xl:w-[40%] -top-40   md:top-[20px] right-1 md:right-[0] bg-[#ffffff] shadow-2xl`}
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
  );
};

export default DashboardTable;
