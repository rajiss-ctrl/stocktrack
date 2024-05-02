import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useSpring, animated } from "react-spring";
import Spinner from '../../assets/img/spinner.svg'
import { useSelector } from "react-redux";
import db from "../../db/firebase";
import { Link, useLocation } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import UpdateStockState from "../../pages/pages-components/UpdateStockState";
import UpdateStock from "../../pages/UpdateStock";
import { FaMinus } from "react-icons/fa";



export default function CardPageVisits({handleRestock,restock}) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const location = useLocation();
  const currentRoutePath = location.pathname;
  const [salesConfirmation, setSalesConfirmation] = useState(-1);
  const [stockState, setStockState] = useState(-1);
  const [minusFromStock, setMinusFromStock]= useState(0)
  const [currencySymbol, setCurrencySymbol] = useState('₦');

  const product = useSelector((store) => store.product.productData);
  const userData = useSelector((store) => store.buz.buzProfileData);
  

  const handleConfirmation = (event,index) => {
    event.preventDefault()
    
    if (salesConfirmation === index) {
      setSalesConfirmation(-1);
      return;
    }
    setSalesConfirmation(index);
   console.log('handleConfirmation executed');

  };

  const Confirmation = ({item,index}) => {
    const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
    });
  
    return (
      <animated.div
        style={fadeInProps}
        className="bg-white shadow-2xl font-semibold rounded-[0.222rem] flex flex-col justify-center items-center p-2"
      >
        <h4 className="pb-1 text-slate-500">Sales Figure</h4>
        <div className="flex items-center gap-2">
        <button
       onClick={(e) =>{
       handleConfirmation(e, index) 
       handleMinus(e, item.id, item?.product_Qty)}
              }
          className="bg-green-600 text-white text-[10px] leading-4 font-bold px-2 py-[0.18rem] outline-transparent border-0 rounded-[0.222rem]"
        >
          Confirm
        </button>
        <button onClick={handleConfirmation} className="bg-red-500 text-white text-[10px] leading-4 font-bold px-[0.3rem] py-[0.18rem] outline-transparent border-0 rounded-[0.222rem]">
          Decline
        </button>
        </div>
      </animated.div>
    );
  };
  
  const handleMinus = async (e, id, qty) => {
  e.preventDefault();

  try {
    const newQty = Number(qty) - Number(minusFromStock);
    const newFields = { product_Qty: newQty };
    const taskDocRef = doc(db, "stock", id);

    await updateDoc(taskDocRef, newFields);
    console.log('handleMinus executed');
  } catch (err) {
    alert(err);
  } finally {
    // Reset the state after the update, regardless of success or failure
    setMinusFromStock(0);
  }
};
  useEffect(() => {
    // Use the Geolocation API to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        // const { latitude, longitude } = position.coords;

        // Use latitude and longitude to determine the user's location
        // For simplicity, let's assume Nigeria if latitude is positive
        const isUserInNigeria = latitude > 0;

        // Update the currency symbol based on the user's location
        setCurrencySymbol(isUserInNigeria ? '₦' : '$');
      });
    }
  }, []); // Empty dependency


const handleStockStateUpdateModal = (event, index) =>{
  event.preventDefault()
    
    if (stockState === index) {
      setStockState(-1);
      return;
    }
    setStockState(index);
  

}

// delete from stock
const handleDeleteItem = async (e,id) => {
  e.preventDefault()
  const taskDocRef = doc(db, "stock", id);
  try {
    await deleteDoc(taskDocRef);
  } catch (err) {
    alert(err);
  }
};

  return (
    <>
      <div className={`relative flex flex-col min-w-0 break-words bg-white w-full  md:mt-0 mb-2 md:mb-14  rounded ${currentRoutePath === '/inventorytable' ? "mt-0" : "mt-36"}`}>
       <div className={`${!restock ? 'hidden' : 'block '}`}>
       <UpdateStock handleRestock={handleRestock} restock={restock}/>
       </div>
        <div className="flex  px-4 items-center justify-end">  
          {currentRoutePath === '/inventorytable' ? 
          <></> :  
          userData.length !== 0 && userData?.map(user=>
              <div key={user?.id}>
                  <img className="w-8" src={user?.logo} alt={user.businessName}/>
              </div >)
              
           }
        </div>
        
        <div ref={componentRef}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap sm:px-2 sm:pb-5 items-center">
            <div className="relative w-full  text-slate-500 max-w-full flex-grow flex-1">
              {currentRoutePath === '/inventorytable' ? 
               <div className="flex flex-wrap gap-1"> <span className="hidden sm:block">Inventory</span> Overview</div> :

              <h3 className="font-semibold kumbh text-base text-blueGray-700">
                INVENTORY
              </h3>
              }
            </div>
            <div className="relative w-full sm:px-4  max-w-full flex-grow flex-1 text-right">
              {currentRoutePath === '/inventorytable' ? 
                 <Link to="/dashboard"
                 className="bg-[#46148B]  text-white active:bg-[#2e0a61] shadow hover:shadow-lg text-xs  uppercase px-3 py-2 rounded outline-transparent focus:outline-transparent mr-1 mb-1 ease-linear transition-all duration-150">
                  Dshboard
                 </Link> :
               <Link to='/inventorytable'
               className="bg-[#46148B] text-white active:bg-[#2e0a61] shadow hover:shadow-lg text-xs font-bold uppercase px-3 py-1 rounded outline-transparent focus:outline-transparent mr-1 mb-1 ease-linear transition-all duration-150"
               type="button"
             >
               See all
             </Link>
            }
            </div>
   
          </div>
          </div>
        <div className="block w-full overflow-x-auto lg:overflow-x-hidden">
          {/* Projects table */}
          <table className="items-center w-full h-full bg-transparent border-collapse overflow-hidden">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Items
                </th>
                <th className="hidden lg:block px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Product Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <span className="hidden lg:block">  Quantity</span>
                  <span className=" lg:hidden">Qty</span>
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <span className="hidden lg:block">Packaging Sizes</span>
                  <span className=" lg:hidden">Sizes</span>
                </th>
                <th className={`${currentRoutePath === '/inventorytable' ? 'block' : 'hidden'} px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left`}>
                  Price
                </th>
                
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                {currentRoutePath === '/inventorytable' ? 'Total' : 'Action'}
                
                </th>
              </tr>
            </thead>
            <tbody>
              {product.length === 0 ? 
            <tr>
              <td className="w-full text-center" colSpan={`${currentRoutePath === '/inventorytable' ? "8" : "4"}`}>
                <div className="flex justify-center items-center pt-5  h-full">
                  <img src={Spinner} alt="spinner" className="w-14 sm:w-24 h-14 sm:h-w-24" />                   
                </div>
              </td>
            </tr>
                :
              product?.map((item, index) => (
                <tr key={index} onClick={currentRoutePath === '/inventorytable' ? (event) => handleStockStateUpdateModal(event, index) : undefined} className={`${currentRoutePath === '/inventorytable' && "cursor-pointer hover:bg-slate-50"} `}>
                  <td className={`border border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left `}>
                  <div className={`${stockState === index ? 'block' : 'hidden' } absolute mt-14 lg:mt-0 lg:h-screen flex justify-center items-center   top-0 w-full bg-transparent left-0 `}>
                    <UpdateStockState 
                    id={item.id} 
                    qty={item.product_Qty}
                    price={item.product_Price} 
                    des={item.product_description} 
                    siz={item.size} 
                    stockState={stockState}
                    handleStockStateUpdateModal={handleStockStateUpdateModal}
                    handleDeleteItem={handleDeleteItem}
                    index={index}/>
                  </div>
                  {item?.img === undefined ? 
                  <img src={Spinner} alt={item.product_name} className="w-8 h-8" />                   
                  : 
                  <img src={item?.img} alt={item.product_name} className="w-8 h-8 rounded-md" />                   
                  }
                  </td>
                  <td className="hidden  h-full md:flex items-center border border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left">
                    {item?.product_name}
                  </td>
                  <td className="border border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                    {item?.product_Qty}
                  </td>
                  <td className="border border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                     {item?.product_Qty <= 1 ? <span>{item?.size}</span> : <span>{item?.size}s</span>}
                  </td>
                  {currentRoutePath === '/inventorytable' ? 
                  <td className="border  border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                   {/* ₦ {item.product_Price} */}
                    {currencySymbol} {item.product_Price}
                  </td>
                   : 
                   <td className=" border relative  border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                      <form className="flex items-center">
                        <input  onChange={(e) => setMinusFromStock(e.target.value)} placeholder="Sales" type='number' className="w-[100px] md:w-auto bg-white outline-transparent border border-solid border-blueGray-100 rounded-l-md py-1 md:py-2 px-2" />
                        <button onClick={(e) => handleConfirmation(e,index)}  className="w-[50px] md:w-auto bg-[#3edd3e] uppercase border border-solid outline-transparent font-bold border-[#3edd3e] rounded-r-md py-1 md:py-2 px-4 text-white">
                          <span className="hidden md:block"> Deplete</span>
                          <span className=" md:hidden"><FaMinus/></span>
                        </button>
                          <div className={`${salesConfirmation === index ? 'block' : 'hidden'} absolute  -top-2 right-0`}>
                            <Confirmation item={item} handleMinus={handleMinus}/>
                          </div> 
                      </form>
                  </td>
                   }
                   {currentRoutePath === '/inventorytable' ? 
                   <td className="border border-solid border-t-0 border-b-blueGray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                    {currencySymbol} {Number(item?.product_Qty) * Number(item?.product_Price)}
                  </td>:
                  <></>
                }
                </tr>
              ))
            }
              
            </tbody>
          </table>

        </div>
        </div>
     
      </div>
          <div className="pl-3 sm:pl-0">
          {currentRoutePath === '/inventorytable' &&
          <button className="outline-transparent border-0 bg-[#46148B] rounded-lg hover:px-5 hover:rounded-xl text-sm py-2 px-3 text-white" onClick={handlePrint}>
            Print
          </button>
          }
      </div>
      </>
  );
}
