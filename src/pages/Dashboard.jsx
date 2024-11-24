import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CardPageVisits from "../components/Cards/CardPageVisits";
import CardLineChart from "../components/Cards/CardLineChart";
import FooterAdmin from "../components/Footers/FooterAdmin";

function Dashboard() {
  const [restock, setRestock] = useState(false);

  const handleRestock = () => {
    setRestock((prev) => !prev);
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-gray-100 via-blue-100 to-purple-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar restock={restock} handleRestock={handleRestock} />

        {/* Main Content */}
        <div className="flex-1 md:ml-[20%] py-6 px-3 md:p-6">
          <h1 className="text-3xl font-semibold text-indigo-800 mb-8">
            Dashboard
          </h1>

          {/* Page Visits Card */}
          <div className="bg-white shadow-lg rounded-lg mb-8 p-6">
            <CardPageVisits handleRestock={handleRestock} restock={restock} />
          </div>

          {/* Line Chart Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-28 md:mb-10">
            <CardLineChart />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg fixed bottom-0 w-full">
        <FooterAdmin />
      </div>
    </>
  );
}

export default Dashboard;
