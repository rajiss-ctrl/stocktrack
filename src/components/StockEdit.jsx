import React from "react";

const StockEdit = ({
  item,
  index,
  newStock,
  handleAddItem,
  handleMinus,
  handleEdit,
  setNewStock,
}) => {
  return (
    <div className=" w-full flex flex-col justify-center p-[20px]">
      <h1
        onClick={() => handleEdit(index)}
        className="text-center mb-8 text-[1.0rem] leading-3 font-[600]"
      >
        Manage {item?.product_name} - stock level
      </h1>
      <form action="">
        <input
          type="number"
          name="stock"
          className="py-2 px-4  text-[11px] outline-none border border-gray-400 sm:text-sm w-full mb-6 rounded"
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Item Qty"
        />
      </form>
      <div className="flex justify-between">
        <button
          onClick={() => handleEdit(index)}
          className="rounded text-[11px] sm:text-sm border border-[1px solid] border-[red] p-[5px_8px] text-[red]"
        >
          cancel
        </button>
        <button
          onClick={() => handleAddItem(item.id, item?.product_Qty)}
          className="rounded text-[11px] sm:text-[14px] border border-[1px solid] bg-[green] p-[5px_10px] text-[#ffffff]"
        >
          Add Stock
        </button>
        <button
          onClick={() => handleMinus(item.id, item?.product_Qty)}
          className="rounded text-[11px] sm:text-sm border border-[1px solid] bg-dark-purple p-[8px_8px] text-[#ffffff]"
        >
          Minus Sales
        </button>
      </div>
    </div>
  );
};

export default StockEdit;
