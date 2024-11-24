import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { formatDistanceToNow } from 'date-fns';

// Registering the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function CardLineChart() {
  const [alertVisible, setAlertVisible] = useState(true); // State to control the visibility of the alert
  const product = useSelector((store) => store.product.productData);
  console.log(product);

  // Labels for the chart (product names)
  const labels = product.map((item) => item.product_name);

  // Stock quantity
  const productQty = product.map((item) => item.product_Qty);

  // Stock date and initial stock date (assuming you have this data in the product object)
  const stockDates = product.map((item) => {
    // Check if the stock_date exists and is a valid timestamp
    const stockDate = item.timestamp && item.timestamp.toDate ? item.timestamp.toDate() : null;
    return stockDate ? stockDate : null;  // If no valid date, return null
  });

  // Threshold for fast-moving product
  const threshold = 1000;

  // Function to calculate days taken to reach below threshold
  const calculateDaysToThreshold = (stockDate, qty) => {
    if (qty <= threshold && stockDate) {
      const days = formatDistanceToNow(stockDate, { addSuffix: true }); // calculates time passed since stocked date
      return days;
    }
    return null;
  };

  // Calculate days to threshold for each product
  const daysToThreshold = product.map((item) => calculateDaysToThreshold(item.timestamp ? item.timestamp.toDate() : null, item.product_Qty));

  // Calculate sales based on stock quantity adjustments
  const calculateSales = (item) => {
    return item.initialStock - item.product_Qty; // Example: sales = initial stock - current quantity
  };

  // Calculate sales for each product
  const sales = product.map((item) => calculateSales(item));

  // Determine color based on stock level (above or below 1000)
  const stockColor = productQty.map((qty) =>
    qty < threshold ? "#FF5733" : "#4c51bf" // Red for low stock (< threshold), blue for higher stock
  );

  // Sales color can be determined in a similar way
  const salesColor = sales.map((sale) =>
    sale < 100 ? "#FF6347" : "#3edd3e" // Red for low sales (< 100), green for higher sales
  );

  // Data for the chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: stockColor, // Color based on stock level
        borderColor: stockColor,
        data: productQty,
        fill: false,
        borderWidth: 2,
      },
      {
        label: "Sales Level",
        backgroundColor: salesColor, // Color based on sales
        borderColor: salesColor,
        data: sales,
        fill: false,
        borderWidth: 2,
      },
      {
        label: "Days to Threshold (1000)",
        backgroundColor: "#FFA500", // Orange for days to threshold
        borderColor: "#FFA500",
        data: daysToThreshold,
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  // Calculate fast-moving products for display text
  const fastMovingProducts = product.filter((item) => item.product_Qty <= threshold && item.timestamp);
  const fastMovingProductInfo = fastMovingProducts.map((item) => {
    const days = calculateDaysToThreshold(item.timestamp.toDate(), item.product_Qty);
    return `${item.product_name}: ${days}`;
  }).join(", ");

  // Function to close the alert
  const handleCloseAlert = () => {
    setAlertVisible(false); // Set alert visibility to false when the user clicks "OK"
  };

  return (
    <>
      {alertVisible && (
        <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-75 p-4 z-50">
          <div className="max-w-lg mx-auto bg-blueGray-950 rounded-lg p-4 shadow-2xl">
            <h6 className="text-lg font-bold mb-2">
              Inventory Alert: Limited stock, low sales as of{" "}
              {new Date().toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </h6>
            <p className="text-sm mb-4">
              Some of your products have low stock or sales. Please review the inventory.
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleCloseAlert}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="relative flex flex-col min-w-0 break-words w-full md:mb-6 rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-500 text-[14px] md:text-xs mt-6 md:mt-0 kumbh font-bold">
                Inventory Alert: Limited stock, low sales as of{" "}
                {new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </h6>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative sm:p-4">
          <Line data={data} />
        </div>

        {/* Instruction/Description Section */}
        <div className="mt-4 p-4 bg-blueGray-800 rounded-xl shadow-md border border-gray-600">
          <p className="text-white text-sm font-semibold">
            <span className="text-yellow-400 font-bold">Stock Level:</span>{" "}
            Stock levels below 1000 units are considered low. <br />
            <span className="text-yellow-400 font-bold">Sales Level:</span>{" "}
            Sales levels below 100 units indicate low demand. <br />
            <span className="text-red-500 font-bold underline">
              (High sales products signal more stock)
            </span>
            <br />
            <span className="text-teal-400 font-bold">Fast-Moving Products:</span>{" "}
            Products that reach the 1000 threshold quickly are considered fast-moving. The chart above tracks the{" "}
            <span className="text-orange-500">days it took</span> to reduce the stock to 1000 units.
            <br />
            <span className="text-green-400 font-bold block">
              Fast-moving products: {fastMovingProductInfo}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
