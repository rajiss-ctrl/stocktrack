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
      }  bg-transparent grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-1`}
    >
      {product.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`shadow rounded bg-white cursor-pointer p-2  ${
              item?.product_Qty < 20
                ? "border-l-[0.2em] border-[red]"
                : "border-l-[0.2em] border-[yellow]"
            } ${item?.product_Qty >= 100 && "hidden"} ${
              item?.product_Qty > 50 && "hidden"
            }`}
          >
            <h1 className={` text-[red] font-[400]`}>
              {item?.product_Qty <= 50 ? (
                <div className="flex justify-between">
                  <div className="flex items-center gap-[3px]">
                    <img
                      className="w-16  h-16 rounded-[50%]"
                      src={item.img}
                      alt="product"
                    />
                  </div>
                  <div className="">
                    <span className="font-[600] text-sm text-dark-purple">
                      {item?.product_name}
                    </span>

                    <p>
                      <span>
                        {item?.product_Qty === 0 ? (
                          <span className="text-xs lg:text-sm font-[600]">
                            is empty
                          </span>
                        ) : (
                          <span className="text-xs lg:text-sm font-[600]">
                            running low
                          </span>
                        )}{" "}
                      </span>
                      <span
                        className={`${
                          item?.product_Qty < 20
                            ? "text-white  bg-[red]"
                            : "text-[#000] bg-[yellow]"
                        } shadow-sm md:shadow-lg text-sm p-[0.2rem_0.3rem] rounded font-[600]`}
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
