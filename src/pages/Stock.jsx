import React, { useState } from "react";
import { useSelector } from "react-redux";
import Product from "./pages-components/Product";
import NavBar from "../components/NavBar";

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
    <div className="bg-[rgb(255,_255,_255,_0.5)] ">
      <NavBar />
      <div className="px-10  lg:px-20 pt-16 lg:pt-32 pb-28 min-h-[100vh]">
        {product.length === 0 ? (
          <p className="p-10 bg-[rgba(175,243,200,0.6)] border ">
            You don't have any item in stock!....
          </p>
        ) : (
          product?.map((item, index) => {
            return (
              <>
                <Product
                  handleClick={handleClick}
                  item={item}
                  index={index}
                  visible={visible}
                  key={item.id}
                />
              </>
            );
          })
        )}

        <div className="w-[100%]  grid grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-3  items-center mt-12 lg:mt-[35px]">
          {product?.map((btn, index) => {
            return (
              <div key={btn.id}>
                <button
                  className={`hover:text-[green] shadow-[0_20px_25px] items-center justify-center p-[5px] flex flex-col`}
                  onClick={() => handleClick(index)}
                >
                  <img
                    className={`"hover:rotate-[360deg] "
                    drop-shadow-[7px_5px_3px_white] duration-500`}
                    src={btn.img}
                    alt="button"
                  />
                  <div className=" text-sm font-[600]">
                    <p>{btn.product_name}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stock;
