import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../../db/firebase'


const Editbuz = ({handleBuzProfileEdit}) => {
    const buzData = useSelector((store)=> store.buz.buzProfileData)

    const [buz,setBuz] = useState("")
    const [address,setAddress] = useState("")

    const handleUpdate = async (id) => {
  const taskDocRef = doc(db, 'businesses', id)
  try{
    await updateDoc(taskDocRef, {
      businessName: buz,
      businessAddress: address
    })
  } catch (err) {
    alert(err)
  }    
}

  return (
    <div className='z-[10] p-[30px] absolute left-[250px] w-[20%] top-[80px] shadow bg-[#FFFFFF]'>
        { buzData?.map((item)=>{
              return (

                  
                  <div  key={item.id} className="  flex justify-center items-center flex-col">
                        <img className='w-[30px] mb-[15px]' src={item.logo} alt="" />
                        <h1 className='m-[10px_0]'>Update Business Profile</h1>
                        <input type="text"
                        className='
                                  w-[100%] mb-3  
                                  border bg-[rgb(250,_228,_232)]
                                  outline-[0] border-[none] 
                                  rounded-[8px]  h-[40px] 
                                  text-[#808080] text-[14px] 
                                  font-[200] p-[13px] 
                                  leading-[24px]
                                  '
                        placeholder={`Edit ${item.businessName} Buz Name?`}
                        onChange={(e)=>setBuz(e.target.value)}
                      />
                        <input type="text"
                        className='
                                  w-[100%] mb-3  
                                  border bg-[rgb(250,_228,_232)]
                                  outline-[0] border-[none] 
                                  rounded-[8px]  h-[40px] 
                                  text-[#808080] text-[14px] 
                                  font-[200] p-[13px] 
                                  leading-[24px]
                                  '
                        placeholder={`Edit Business Address`}
                        onChange={(e)=>setAddress(e.target.value)}
                      />
                        <div className="flex gap-[20px] w-[100%]">
                            <button onClick={handleBuzProfileEdit} 
                                    className="border border-[1px solid] border-[rgb(255,_101,_132)] text-[rgb(255,_101,_132)] rounded-[4px] p-[4px_10px]">
                                    Close
                            </button>
                            <button onClick={()=>handleUpdate(item?.id)} 
                                    className="bg-[rgb(255,_101,_132)] text-white rounded-[4px] p-[4px_10px]">
                                    Edit
                            </button>
                        </div>
              </div>
              )
            })}
    </div>
  )
}

export default Editbuz