import React from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
const Product = ({ key, index, item, visible }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        key={key}
        className={`${
          visible === index ? "flex" : "hidden"
        } w-full flex-col sm:flex-row sm:gap-4`}
      >
        <div className="w-full lg:w-2/5 flex justify-center items-center  sm:items-center">
          <img
            className="rotate-[360deg] duration-300 drop-shadow-[7px_5px_3px_transparent] h-52 lg:h-[500px] w-fit"
            src={item?.img}
            alt="product"
          />
        </div>
        <div className="w-full lg:w-2/4 lg:pl-40 mt-[20px] lg:mt-[0]">
          {visible === index && (
            <div className="p-4">
              <h2 className="text-xl font-bold">{item?.product_name}</h2>
              <div
                className={`${
                  item.product_Qty > 0 ? "text-green-500" : "text-yellow-600"
                } flex `}
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>{item?.product_description}</p>
              <div className="mt-4">
                <span className="text-gray-600">Price:</span>{" "}
                <span className="font-semibold">N{item?.product_Price}</span>
              </div>
              <div className="mt-4">
                <span className="text-gray-600">Availability:</span>{" "}
                <span
                  className={`font-bold ${
                    item.product_Qty ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.product_Qty > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-base flex gap-3 font-[400]">
                <span className="">Quantity :- </span>
                <span
                  className={`${
                    item.product_Qty < 20
                      ? "text-bold font-bold text-[red]"
                      : "font-bold text-green-600"
                  } `}
                >
                  {item?.product_Qty}
                  <span className="font-bold">
                    {item?.product_Qty <= 1 ? (
                      <span> {item?.size}</span>
                    ) : (
                      <span> {item?.size}s</span>
                    )}
                  </span>
                </span>
              </p>
              <p>
                Stock Balance--N{" "}
                {Number(item?.product_Qty) * Number(item?.product_Price)}{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
