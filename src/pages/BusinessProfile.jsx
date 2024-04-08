import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import db, { storage, useAuth } from "../db/firebase";
import { FaCloudUploadAlt } from "react-icons/fa";


const schema = yup.object().shape({
  about: yup.string().required("About business field is required"),
  businessName: yup.string().required("Business Name is required"),
  businessAddress: yup.string().required("Business Address is required"),
  logo: yup.mixed().required("Logo is required"),
});

const BusinessProfile = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.buz.buzProfileData);

  // const user = useSelector((state) => state.user.user);
  const [logo, setLogo] = useState(
    "https://www.pesmcopt.com/admin-media/images/default-logo.png"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileReader = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setLogo(readerEvent.target.result);
    };
  };

  const onSubmit = async (data) => {
    //setBusinessAddress('');
    // setBusinessName('');
    navigate("/dashboard");

    const docRef = await addDoc(collection(db, "businesses"), {
      user_id: currentUser?.uid,
      businessName: data.businessName,
      businessType: data.businessType,
      businessAddress: data.businessAddress,
      about: data.about,
    });

    const imageRef = ref(storage, `businesses/${docRef.id}/image`);

    if (
      logo !== "https://www.pesmcopt.com/admin-media/images/default-logo.png"
    ) {
      await uploadString(imageRef, logo, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "businesses", docRef.id), {
          logo: downloadURL,
        });

        //Alerts the user that the process was successful
        // alert("Congratulations, you've just created a business profile!");
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F3F5F7]">
      <Link className='absolute hover:shadow-lg top-6 sm:top-6 text-gray-600 shadow-xl bg-transparent text-xs px-3 py-1 rounded-sm sm:rounded-md left-1/2 transform -translate-x-1/2 -translate-y-1/2' to='/dashboard'>Dashboard</Link>
    
    <div className="flex flex-col sm:justify-between sm:flex-row items-center  px-2 sm:px-0 mt-24 sm:mt-0 ">
      <div className="px-2 sm:px-14 sm:w-1/2">
      <div className=" w-full max-h-screen flex flex-col justify-center items-center  sm:shadow bg-[#eceff1] rounded p-3">
        <h3 className="text-center font-bold text-sm text-gray-400 mb-6">
          Create Business Profile
        </h3>

      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* The handleSubmit function sends the form details to Firestore */}
        <input
          type="text"
          className="py-2 outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="businessName"
          placeholder="Business Name"
          {...register("businessName")}
        />
        {errors?.businessName && (
          <span className="text-[red]" role="alert">
            {errors.businessName.message}
          </span>
        )}
        <input
          type="text"
          className="py-2 outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="businessType"
          placeholder="Business Type"
          {...register("businessType")}
        />
        {errors?.businessType && (
          <span className="text-[red]" role="alert">
            {errors.businessType.message}
          </span>
        )}

        <input
          type="text"
          className="py-2 outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="businessAddress"
          placeholder="Business Address"
          {...register("businessAddress")}
        />
        {errors?.businessAddress && (
          <span className="text-[red]" role="alert">
            {errors.businessAddress.message}
          </span>
        )}
        <textarea
          className=" outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="about"
          placeholder="About The Business"
          {...register("about")}
        ></textarea>
        {errors?.about && (
          <span className="text-[red]" role="alert">
            {errors.about.message}
          </span>
        )}

        <div className="flex items-center space-x-4 w-full">
          <div className="flex flex-col w-1/2 pl-16">
            <img src={logo} alt="Logo" className="w-9 h-9 sm:w-14 sm:h-14 rounded-[50%]"  />
          </div>
          <div className="w-full">
          <label
            htmlFor="logo"
            className="w-full flex items-center text-[#46148B] text-xs  px-4 border-0 cursor-pointer"
          >
            <FaCloudUploadAlt className="mr-2 text-xs font-bold cursor-pointer" /> Business Logo
            <input
              accept="image/*"
              required
              // className="opacity-0 absolute cursor-pointer"
              style={{display:"none"}}
              type="file"
              id="logo"
              {...register("logo")}
              onChange={handleFileReader}
            />
               {errors.logo && (
              <span className="text-[red]" role="alert">
                {errors.logo.message}
              </span>
            )}
          </label>
        </div>

        </div>

        <button
          className="hover:bg-dark-purp-hover bg-dark-purple
                        text-xs text-gray-100 w-full p-[10px] 
                        md:p-3 rounded mb-2 uppercase"
          type="submit"
        >
          submit
        </button>
      </form>
      </div>
      </div> 
      {/* profile */}
      <div className="bg-white sm:w-1/2 sm:h-screen">
        {
          userData.map((user)=>{
            return(
              <div key={user.id} className="flex py-16 bg-white w-full   justify-center items-center flex-col">
                <div className="flex flex-col justify-center items-center"> 
                  <img src={user.logo} alt="Logo" className=" w-14 h-14 rounded-[50%]"  />
                  <h1 className="pt-1  text-sm">{user.businessName}</h1>
                  <p className="text-gray-400 text-xs">{user.businessAddress}.</p>
                </div>
                <div className="text-sm pt-5 flex justify-center items-center flex-col">
                  <h4 className="border border-gray-400 px-4 py-2">{user.businessType}</h4>
                  <article className="pt-5">
                    <h4 className="leading-normal md:leading-relaxed lg:leading-loose text-center pb-2">About The Business</h4>
                    <p className="leading-normal md:leading-relaxed lg:leading-loose sm:mx-4 text-gray-500 sm:text-black text-sm sm:text-xs px-4 py-2">{user.about}</p>
                  </article>
              </div>
              </div>
            )
          })
        }
      
    </div>
    </div>
    </div>
  );
};

export default BusinessProfile;
