import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import db, { storage, useAuth } from "../db/firebase";

const BusinessProfile = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [logo, setLogo] = useState(
    "https://www.pesmcopt.com/admin-media/images/default-logo.png"
  );

  {
    /* The handleFileReader function converts the business logo (image file) to base64 */
  }
  const handleFileReader = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setLogo(readerEvent.target.result);
    };
  };

  /* The handleSubmit function sends the form details to Firestore */
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents the page from refreshing
    setBusinessAddress("");
    setBusinessName("");
    navigate("/dashboard");

    const docRef = await addDoc(collection(db, "businesses"), {
      user_id: currentUser?.uid,
      businessName,
      businessAddress,
    });

    const imageRef = ref(storage, `businesses/${docRef.id}/image`);

    if (
      logo !== "https://www.pesmcopt.com/admin-media/images/default-logo.png"
    ) {
      await uploadString(imageRef, logo, "data_url").then(async () => {
        //Gets the image URL
        const downloadURL = await getDownloadURL(imageRef);

        //Updates the docRef, by adding the logo URL to the document
        await updateDoc(doc(db, "businesses", docRef.id), {
          logo: downloadURL,
        });

        //Alerts the user that the process was successful
        // alert("Congratulations, you've just created a business profile!");
      });
    }
  };

  return (
    <div className="w-[100%] md:h-[500px]  md:p-8 md:w-2/3 md:shadow mx-auto mt-8 rounded p-3 my-8">
      <h3 className="text-center font-bold text-xl text-dark-purple mb-6">
        Setup Business Profile
      </h3>

      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        {/* The handleSubmit function sends the form details to Firestore */}
        <input
          type="text"
          required
          className="py-2 outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="businessName"
          value={
            currentUser?.displayName ? currentUser?.displayName : businessName
          }
          placeholder={`${
            currentUser?.displayName
              ? currentUser?.displayName
              : "Business Name"
          }`}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          type="text"
          required
          className="py-2 outline-yellow-50 px-4 w-full mb-6 border capitalize rounded"
          id="businessAddress"
          value={businessAddress}
          placeholder="Business Address"
          onChange={(e) => setBusinessAddress(e.target.value)}
        />

        <div className="flex items-center space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            <img src={logo} alt="Logo" className=" w-full max-h-[300px]" />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="logo" className="text-sm mb-1">
              Upload logo
            </label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full mb-6  rounded"
              id="logo"
              onChange={handleFileReader}
            />
          </div>
        </div>

        <button
          className="hover:bg-dark-purp-hover bg-dark-purple
                        text-sm md:text-sm text-gray-100 w-full p-[10px] 
                        md:p-5 rounded my-6"
        >
          COMPLETE PROFILE
        </button>
      </form>
    </div>
  );
};

export default BusinessProfile;
