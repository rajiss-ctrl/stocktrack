import React, { useState, useEffect } from "react";
import { FaStore, FaOpencart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Notification = () => {
  const product = useSelector((store) => store.product.productData);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  useEffect(() => {
    {
      product.forEach((element) => {
        if (element.product_Qty <= 19) {
          setIsNotificationVisible(false);
        }
      });
    }
  }, [isNotificationVisible, product]);

  // Close notification
  const handleCloseNotification = () => {
    setIsNotificationVisible(true);
  };
  return (
    <div
      className={`${
        isNotificationVisible === true ? "hidden" : "block"
      } w-full bg-transparent flex flex-col md:flex-row items-center gap-4`}
    >
      {product.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`shadow rounded bg-white w-[100%] md:w-[25%] lg:w-[22%] cursor-pointer p-[.8rem_.5rem]  ${
              item?.product_Qty < 20
                ? "border-l-[0.2em] border-[red]"
                : "border-l-[0.2em] border-[yellow]"
            } ${item?.product_Qty >= 100 && "hidden"} `}
          >
            <h1 className="text-[red] font-[400] ">
              {item?.product_Qty <= 50 && (
                <div className="">
                  <div className="flex items-center gap-[3px]">
                    <img
                      className="w-[1.8rem] h-[1.8rem] rounded-[50%]"
                      src={item.img}
                      alt="product"
                    />
                    <span className="font-[400] text-[#000]">
                      {item?.product_name}
                    </span>
                  </div>
                  <p>
                    <span>
                      {item?.product_Qty === 0 ? (
                        <span className="text-sm">is empty</span>
                      ) : (
                        <span className="text-sm">is running low</span>
                      )}{" "}
                    </span>
                    <span
                      className={`${
                        item?.product_Qty < 20
                          ? "text-white  bg-[red]"
                          : "text-[#000] bg-[yellow]"
                      } shadow-sm md:shadow-lg text-sm p-[0.2rem_0.3rem] rounded font-[400]`}
                    >
                      {item?.product_Qty <= 1 ? (
                        <span>
                          {item?.product_Qty} {item?.size}
                        </span>
                      ) : (
                        <span>
                          {item?.product_Qty} {item?.size}s
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              )}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
