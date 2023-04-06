import React from "react";
import { useSelector } from "react-redux";
const Product = ({ index, item, visible }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        className={`${
          visible === index ? "flex" : "hidden"
        } w-[100%] flex-col justify-center lg:flex-row lg:py-[40px]`}
      >
        <div className="w-[100%] lg:w-[30%]  flex justify-center items-center bg-[#da5098] rounded-[10px]">
          <img
            className="drop-shadow-[7px_5px_3px_white] w-[90%] lg:w[100%] min-[360px]:w-[320px] min-[390px]:w-[340px] min-[400px]:w-[360px] h-[260px] sm:w-[290px] sm:h-[290px] md:w-[290px] md:h-[300px]  xl:w-[400px] xl:h-[350px] lg:h-[400px] "
            src={item?.img}
            alt="product"
          />
        </div>
        <div className="lg:pl-[20px] w-[100%] sm:w-[30%]">
          <h1 className="text-[16px] sm:text-[25px] mt-[20px] md:mt-[0] font-[400] sm:font-[600] text-[#da5098]">
            {item?.product_name}
          </h1>
          <p className="text-[14px] sm:text-[16px]">
            {item?.product_description}
          </p>
          <p className="text-[14px] flex gap-[10px] font-[400] sm:font-[400] sm:text-[16px]">
            <span className="">Quantity :- </span>
            <span
              className={`${
                item.product_Qty < 20 ? "text-[red]" : "text-[green]"
              }  font-[400]`}
            >
              {item?.product_Qty}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
