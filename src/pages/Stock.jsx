import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../custom-hooks/useToggle";
import Product from "./pages-components/Product";

const Stock = () => {
  const [visible, setVisible] = useState(0);
  const user = useSelector((state) => state.user.user);
  console.log(user.id);
  const product = useSelector((store) => store.product.productData);
  console.log(product);
  // const {isOpen} = useSelector((store)=> store.modal)

  const handleClick = (index) => {
    setVisible(index);
  };

  return (
    <div className="">
      {product.length === 0 ? (
        <p>Loading....</p>
      ) : (
        product?.map((item, index) => {
          return (
            <div key={item.id} className="w-[100%] p-[15px]">
              <Product
                handleClick={handleClick}
                item={item}
                index={index}
                visible={visible}
              />
            </div>
          );
        })
      )}

      <div className="w-[100%] flex gap-[20px] flex-wrap p-[18px] items-center mt-[0] lg:mt-[35px] lg:px-[18%] ">
        {product?.map((btn, index) => {
          return (
            <div key={btn.id}>
              <button
                className={` border-[none] bg-[#da5098] w-[60px] h-[60px] lg:w-[100%] rounded-[10px] flex items-center justify-center p-[5px]`}
                onClick={() => handleClick(index)}
              >
                <img
                  className="drop-shadow-[7px_5px_3px_white] w-[30px] h-[30px] lg:w-[100%] lg:h-[100%]"
                  src={btn.img}
                  alt="button"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stock;
