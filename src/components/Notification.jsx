import React, { useState, useEffect } from "react";
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
      }  bg-transparent grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4`}
    >
      {product.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`shadow rounded bg-white cursor-pointer py-2 px-1  ${
              item?.product_Qty < 20
                ? "border-l-[0.2em] border-[red]"
                : "border-l-[0.2em] border-[#f7c100]"
            } ${item?.product_Qty >= 100 && "hidden"} ${
              item?.product_Qty > 50 && "hidden"
            }`}
          >
            <h1 className={` text-[red] font-[400]`}>
              {item?.product_Qty <= 50 ? (
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <img
                      className="w-fit h-16 rounded-[50%]"
                      src={item.img}
                      alt="product"
                    />
                  </div>
                  <div className="">
                    <span className="font-[600] text-sm text-dark-purple">
                      {item?.product_name}
                      <span>
                        {item?.product_Qty === 0 ? (
                          <span className="text-xs lg:text-sm font-[600]">
                            {" "}
                            is empty
                          </span>
                        ) : (
                          <span className="text-xs lg:text-sm font-[600]">
                            {" "}
                            is running low
                          </span>
                        )}
                      </span>
                    </span>

                    <p>
                      <span
                        className={`${
                          item?.product_Qty < 20
                            ? "text-white  bg-gradient-to-r from-[rgb(211,_24,_24)] to-yellow-200 bg-clip"
                            : "text-[#000] bg-gradient-to-r from-green-600 to-yellow-300 bg-clip"
                        } shadow-sm md:shadow-lg text-md py-1 px-2 rounded font-[800]`}
                      >
                        {item?.product_Qty <= 1 ? (
                          <span>
                            {item?.product_Qty} {item?.size.slice(0, 3)}
                          </span>
                        ) : (
                          <span>
                            {item?.product_Qty} {item?.size.slice(0, 2)}s
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
