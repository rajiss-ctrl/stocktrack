import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";


export default function CardLineChart() {
  const product = useSelector((store) => store.product.productData);
  

  const labels = product.map((item) => `${item.product_name}`);
  const productQty = product.map((item) => item.product_Qty);
  const sales = product.map((item) => -Number(item.product_Qty) );


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: productQty,
        fill: false,
      },
      {
        label: 'Sales level',
        data: sales,
        borderColor: "#3edd3e",
        backgroundColor: "#3edd3e",
        fill: false,
      },
    ],
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  md:mb-6  rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase  text-slate-500  text-xs kumbh font-bold">
            Inventory Alert: Limited stock, low sales as of {"  "}
        {new Date().toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })} {" "}
        <span className="text-red-500 font-bold underline">{"  "}
          (Negative figures suggest low demand)
        </span>.
      </h6>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative p-4">
          <Line Chart={Chart} data={data} />
        </div>
      </div>
    </>
  );
}
