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
      } bg-[#c9eec9] w-[100%] px-[10px] md:p-[10px]`}
    >
      <div className="flex justify-between">
        <h1 className="text-[red] p-[10px] font-[800]">NOTIFICATION</h1>
        <button
          onClick={handleCloseNotification}
          className={` text-[red] p-[10px]`}
        >
          <FaTimes />
        </button>
      </div>
      {product.map((item) => {
        return (
          <div key={item.id} className=" ">
            <div className="">
              <h1 className="text-[red] font-[600] ">
                {item?.product_Qty < 20 ? (
                  <p>
                    {" "}
                    <span className="font-[800] text-[#646cff]">
                      {item?.product_name}
                    </span>{" "}
                    is running low! [{item?.product_Qty}]{" "}
                  </p>
                ) : (
                  <></>
                )}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
