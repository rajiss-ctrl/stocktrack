import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbars/IndexNavbar'
import FooterAdmin from '../../components/Footers/FooterAdmin'
import Drownfan from "../../assets/img/drownfan.png";

const Index = () => {
    const [switchPage, setSwitchPage] = useState(true)

    const handlePageSwitch = ()=>{
        setSwitchPage(pre=>!pre)
    }
  return (
    <div className='bg-[#F3F5F7]'>
      <Navbar/>
      <div className="sm:relative hero-bg w-full h-screen text-sm md:mb-4 xl:mb-8 flex flex-col justify-center items-center">
      <div className="hidden sm:block sm:absolute top-24 right-24">
        <img src={Drownfan} alt="drown fan" />
      </div>
      
      {switchPage ? <SignIn/> : <SignUp/>}
      {!switchPage ? 
         <div className="w-full text-sm flex flex-col justify-between mt-5  px-3 sm:px-32 sm:flex-row">
            <p className=' text-[#186F4A] underline font-light'><Link to='/reset'>Forget Password?</Link></p>
            <p className='text-[#000000]'>Already have an account <span className='cursor-pointer text-[#186F4A] underline font-light' onClick={handlePageSwitch}>Login</span></p>
          </div> 
        : 
          <p className='mt-5 text-[#000000]'>
            <span className='cursor-pointer  text-[#186F4A] underline font-light' onClick={handlePageSwitch}>Sign up here</span>
          </p>
        }
      </div>
        <div className="sm:hidden">
        <FooterAdmin/>
        </div>
    </div>
  )
}

export default Index
