import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbars/IndexNavbar'
import FooterAdmin from '../../components/Footers/FooterAdmin'
import Drownfan from "../../assets/img/drownfan.png";

const SigninSignup = () => {
    const [switchPage, setSwitchPage] = useState(true)

    const handlePageSwitch = ()=>{
        setSwitchPage(pre=>!pre)
    }
  return (
    <div className='bg-gradient-to-r from-blue-700 via-indigo-300 to-purple-400 text-white'>
      <Navbar />
      <div className="sm:relative w-full h-screen md:h-auto text-sm md:pt-24 xl:mb-8 flex flex-col justify-center items-center">
      <div className="hidden sm:block sm:absolute top-24 right-24">
        <img src={Drownfan} alt="drown fan" />
      </div>
      
      {switchPage ? <SignIn/> : <SignUp/>}
      {switchPage ? 
         <div className="w-full text-sm text-white flex flex-col justify-between mt-5  px-3 sm:px-32 sm:flex-row">
            <p className=' underline font-light'><Link to='/reset'>Forget Password?</Link></p>
            <span className='cursor-pointer underline font-light' onClick={handlePageSwitch}>Sign up here</span>
          </div> 
        : 
        <p className='m-3'>
            <p className='text-[#000000]'>Already have an account <span className='cursor-pointer text-[#186F4A] underline font-light' onClick={handlePageSwitch}>Login</span></p>
        </p>
        }
      </div>
        <div className="sm:hidden">
        <FooterAdmin/>
        </div>
    </div>
  )
}

export default SigninSignup
