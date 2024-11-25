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
  function calculateDaysToThreshold(timestamp, qty) {
    // Convert Firebase Timestamp to JavaScript Date
    const stockDate =
      timestamp && typeof timestamp.toDate === "function" ? timestamp.toDate() : new Date(timestamp);
  
    if (!stockDate || isNaN(stockDate.getTime())) {
      console.warn("Invalid timestamp:", timestamp);
      return "Invalid Date";
    }
  
    const now = new Date();
  
    // Calculate difference in days
    const differenceInMilliseconds = now - stockDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return differenceInDays > 0 ? differenceInDays : 0;
  }
  
  

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
        <div className="fixed inset-0 bg-[rgba(25,36,41,0.5)] flex justify-center items-center z-50">
          <div className="max-w-lg w-full bg-[#1C1C1E] rounded-xl p-6 shadow-xl relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-[#86E372] font-bold hover:underline"
              onClick={handleCloseAlert}
              aria-label="Close Alert"
            >
              ×
            </button>
            {/* Title */}
            <h6 className="text-lg sm:text-xl font-extrabold text-[#FEBC1F] mb-4 text-center">
              Inventory Alert: Limited Stock, Low Sales
            </h6>
            {/* Date */}
            <p className="text-sm text-[#7B7B7B] text-center mb-6">
              As of{" "}
              {new Date().toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            {/* Description */}
            <p className="text-sm text-[#DEDFFB] text-center mb-6">
              Some of your products have low stock or sales. Please review the
              inventory to ensure optimal management.
            </p>
            {/* Action Button */}
            <button
              className="block mx-auto bg-gradient-to-r from-[#02F7A6] to-[#14FFFF] hover:opacity-90 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
              onClick={handleCloseAlert}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      <div className="relative flex flex-col min-w-0 break-words w-full md:mb-6 rounded bg-blueGray-700">
        <div className="rounded-t mb-0 md:px-4 py-3 bg-transparent">
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
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {fastMovingProducts.map((item) => {
            // Safely convert timestamp
            const stockDate =
              item.timestamp && typeof item.timestamp.toDate === "function"
                ? item.timestamp.toDate()
                : new Date(item.timestamp);

            const days = stockDate && !isNaN(stockDate.getTime())
              ? calculateDaysToThreshold(stockDate, item.product_Qty)
              : "N/A";

            return (
              <li key={item.id} className="mb-1">
                <span className="text-gray-900 font-bold">{item.product_name}</span> was stocked on{" "}
                <span className="text-blue-700">
                  {stockDate && !isNaN(stockDate.getTime())
                    ? stockDate.toLocaleDateString()
                    : "Unknown Date"}
                </span>{" "}
                and reduced to <span className="text-red-600">1000 units</span> in{" "}
                <span className="text-red-600">{days} days</span>.
              </li>
            );
          })}
        </ul>



      </div>
    </>
  );
}
