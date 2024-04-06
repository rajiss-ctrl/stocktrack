import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CardPageVisits from "../components/Cards/CardPageVisits";
import CardLineChart from "../components/Cards/CardLineChart";
import FooterAdmin from "../components/Footers/FooterAdmin";

// components

function Dashboard() {
const [restock, setRestock] = useState(false)
const handleRestock = () =>{
  setRestock(prev => !prev)
}
  
  return (
    <>
    <div className=" md:flex pb-16">
      <div className="md:w-80 flex-1  md:relative">
      <Sidebar restock={restock} handleRestock={handleRestock}/>
      </div>
    <div className="md:pl-[12.5rem] pr-2 md:w-full md:pt-[5%]">
        <div className="flex flex-wrap">
          <div className="w-full md:mb-24 xl:mb-0 ">
            <CardPageVisits handleRestock={handleRestock} restock={restock} />
          </div>
        </div>
        {/* <div className="flex flex-wrap"> */}
          <div className="w-full  md:mb-12 xl:mb-0 ">
              <CardLineChart />
          </div>
        {/* </div> */}
      </div>
    </div>
    <div className="md:fixed z-10 bg-slate-50 bottom-0 w-full">
      <FooterAdmin/>
    </div>
    </>
  );
}

export default  Dashboard
