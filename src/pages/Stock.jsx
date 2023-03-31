import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import StockUpdateModal from '../components/modal/StockUpdateModal';
import { useToggle } from '../custom-hooks/useToggle';
import { db } from '../db/firebase';
import Product from './pages-components/Product';

const Stock = () => {
const [items,setItems]=  useState([])
const [isVisible,toggle] = useToggle()
const [visible,setVisible] =useState(0)
const user = useSelector((state) => state.user.user)
console.log(user.id)
const navigate = useNavigate()
const dispatch = useDispatch()
const product = useSelector((store)=> store.product.productData)
console.log(product)
// const {isOpen} = useSelector((store)=> store.modal)





  const handleClick = (index)=>{
  setVisible(index)
}

  return (
      <div>
        <div>
            {product.length === 0 ? <p>Loading....</p> : product?.map((item, index)=>{
            return (
              <div key={item.id} className='w-[100%]'>
                <Product handleClick={handleClick} 
                  item={item} index={index} visible={visible} />
              </div> 
            )
            })}
        </div>
        <div className="w-[100%] flex gap-[20px] flex-wrap items-center mt-[35px] px-[20%] ">
          {product?.map((btn,index)=>{
            return(
              <div key={btn.id}>
                <button className={` border-[none] bg-[#da5098] rounded-[10px] flex items-center justify-center p-[15px]`} 
                  onClick={()=>handleClick(index)}>
                  <img className='drop-shadow-[7px_5px_3px_white] w-[80px] h-[80px]' src={btn.img} alt="button" />
                </button>
              </div>
            )
          })}
          </div>
      </div>
  )
}

export default Stock

