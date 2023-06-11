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
    <div className="bg-gradient-to-t from-[rgb(8,_26,_81,_0.4)] to-white-800 bg-clip">
      <NavBar />
      <div className="px-10  lg:px-20 pt-16 lg:pt-32 pb-28 min-h-[100vh]">
        {product.length === 0 ? (
          <p>Loading....</p>
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
                  className={` border-2 border-dark-purple flex items-center justify-center p-[5px]`}
                  onClick={() => handleClick(index)}
                >
                  <img
                    className="drop-shadow-[7px_5px_3px_white] "
                    src={btn.img}
                    alt="button"
                  />
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
