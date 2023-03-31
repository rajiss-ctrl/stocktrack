import React from 'react'

const ConfirmPrompt = ({item,index,handleConfirmPromt,handleDeleteItem}) => {
  return (
    <div onClick={()=>handleConfirmPromt(index)} className='text-[#ffffff] p-[10px]'>
        <h1 className="text-center text-[grey] text-[14px]">Sure to delete - <span className='text-[green]'>{item?.product_name}</span> </h1>
        <div className="flex justify-between mt-[10px]">
            <button className='border border-[1px solid] border-[blue] text-[blue] p-[2px_6px]'>Cancel</button>
            <button onClick={()=>handleDeleteItem(item?.id)} className=' bg-[red] p-[2px_6px]'>Delete</button>
        </div>
    </div>
  )
}

export default ConfirmPrompt