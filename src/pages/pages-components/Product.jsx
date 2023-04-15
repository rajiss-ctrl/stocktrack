import React from "react";
import { useSelector } from "react-redux";
const Product = ({ index, item, visible }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        className={`${
          visible === index ? "flex" : "hidden"
        } w-[100%] ] flex-col  justify-center items-center lg:items-start lg:flex-row p-[20px_0px] less_sm:p-[20px_30px] lg:py-[40px] `}
      >
        <div className="w-[100%]  shadow-[0_10px_20px_rgb(255,_101,_132)] lg:w-[40%]  flex justify-center items-center rounded-[10px] p-[10px]">
          <img
            className="drop-shadow-[7px_5px_3px_white] lg:w[100%] h-[260px] sm:w-[290px] sm:h-[290px] lg:w-[290px] lg:h-[300px]   "
            src={item?.img}
            alt="product"
          />
        </div>
        <div className="lg:pl-[20px] mt-[20px] lg:mt-[0] w-[100%] lg:w-[30%]">
          <h1 className="text-[16px] sm:text-[25px] mt-[20px] md:mt-[0] font-[400] sm:font-[600] text-[#da5098]">
            {item?.product_name}
          </h1>
          <p className="text-[14px] flex gap-[10px] font-[400] sm:font-[400] sm:text-[16px]">
            <span className="">Quantity :- </span>
            <span
              className={`${
                item.product_Qty < 20 ? "text-[red]" : "text-[green]"
              }  font-[400]`}
            >
              {item?.product_Qty}
              <span>
                {item?.product_Qty <= 1 ? (
                  <span> {item?.size}</span>
                ) : (
                  <span> {item?.size}s</span>
                )}
              </span>
            </span>
          </p>
          <p className="text-[14px] sm:text-[16px]">
            {item?.product_description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
