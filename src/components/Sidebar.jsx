import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {FaStore,FaOpencart, FaAngleDown, FaEdit} from 'react-icons/fa'

const Sidebar = ({item, user,handleBuzProfileEdit}) => {
  
  return (
    <div className='w-[100%] mt-[20px]'>
        <div className='text-center text-[28px] text-[#ffffff] px-[8px]'>{item?.businessName}</div>
          <div className="w-[100%] text-center justify-center items-center flex flex-col">
            <div className="w-[150px] h-[150px] md:shadow justify-center items-center flex rounded-[50%]">
                <img className='w-[100px] h-[100px] drop-shadow-[7px_5px_3px_#FFFFFF] rounded-[50%]' src={item?.logo} alt="" />
            </div>
            <h1 className='text-[#e0d7d7] text-center w-[150px]  text-[14px]'> {item?.businessAddress}</h1>
        </div> 
        <ul className='w-[100%] px-[25px] mt-[50px] justify-center flex flex-col'>
            <li onClick={handleBuzProfileEdit} className='z-[10] mt-[15px] text-[#ffffff] hover:text-[#e0d7d7]'>
              <button  className="flex justify-center items-center">
                <span><FaEdit/></span>
                <span>Edit Profile</span>
              </button>
            </li>
            <li className='z-[10] mt-[15px] text-[#ffffff] hover:text-[#e0d7d7]'>
              <div className="flex items-center">
                <span><FaStore/></span>
                <NavLink  to='/stock'>
                  Stock
                </NavLink>
              </div>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar