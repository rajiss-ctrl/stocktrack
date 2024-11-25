import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import DefaultLogo from '../assets/img/default-logo.png';

import db, { storage, useAuth } from "../db/firebase";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";

const schema = yup.object().shape({
  about: yup.string().required("About business field is required"),
  mission: yup.string().required("Business mission field is required"),
  businessName: yup.string().required("Business Name is required"),
  businessAddress: yup.string().required("Business Address is required"),
  logo: yup.mixed().required("Logo is required"),
});

const BusinessProfile = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.buz.buzProfileData);
  const [logo, setLogo] = useState(DefaultLogo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const MAX_FILE_SIZE_MB = 1; // Set maximum file size to 1 MB

const handleFileReader = (e) => {
  e.preventDefault();
  const file = e.target.files[0];

  if (file) {
    const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (!validExtensions.includes(file.type)) {
      alert("Invalid file type! Please upload a JPG, JPEG, or PNG image.");
      e.target.value = null;
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert("File is too large! Please upload an image smaller than 1 MB.");
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      resizeImage(readerEvent.target.result, file.type, (compressedImage) => {
        setLogo(compressedImage);
      });
    };
  }
};

// Compress and resize the image using the canvas API
const resizeImage = (base64Str, mimeType, callback) => {
  const img = new Image();
  img.src = base64Str;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const MAX_WIDTH = 150; // Set a reasonable width for a profile image
    const MAX_HEIGHT = 150; // Set a reasonable height for a profile image

    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width = Math.round((width * MAX_HEIGHT) / height);
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    const compressedImage = canvas.toDataURL(mimeType, 0.7); // Compress to 70% quality
    callback(compressedImage);
  };
};


  const onSubmit = async (data) => {
    navigate("/dashboard");

    const docRef = await addDoc(collection(db, "businesses"), {
      user_id: currentUser?.uid,
      businessName: data.businessName,
      businessType: data.businessType,
      businessAddress: data.businessAddress,
      about: data.about,
      mission: data.mission,
    });

    const imageRef = ref(storage, `businesses/${docRef.id}/image`);

    if (logo !== DefaultLogo) {
      await uploadString(imageRef, logo, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "businesses", docRef.id), {
          logo: downloadURL,
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-purple-100 text-white flex flex-col items-center">
      <Link
        className="absolute flex items-center gap-2 p-1 rounded-sm shadow-sm text-sm bg-white top-4 left-4 text-black hover:text-gray-200 hover:underline"
        to="/dashboard"
      >
        <span><FaArrowLeft/></span>
        <span> to Dashboard></span>
      </Link>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4">
        <div className="w-full lg:w-1/2 bg-white shadow-lg p-6 rounded-lg text-gray-800">
          <h2 className="text-lg font-bold mb-4">Create Business Profile</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Business Name"
              {...register("businessName")}
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">{errors.businessName.message}</p>
            )}
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Business Type"
              {...register("businessType")}
            />
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Business Address"
              {...register("businessAddress")}
            />
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="About the Business"
              {...register("about")}
            ></textarea>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Mission"
              {...register("mission")}
            ></textarea>
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Logo Preview"
                className="w-16 h-16 rounded-full shadow-md"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <FaCloudUploadAlt size={20} />
                <span>Upload Logo</span>
                <input
                  accept=".jpg,.jpeg,.png" // Restrict to JPG, JPEG, and PNG
                  required
                  style={{ display: "none" }}
                  type="file"
                  id="logo"
                  {...register("logo")}
                  onChange={handleFileReader}
                />

              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 bg-white shadow-lg p-6 rounded-lg text-gray-800">
          {userData.length === 0 ? (
            <p className="text-center">No Business Profile Found</p>
          ) : (
            userData.map((user) => (
              <div key={user.id} className="space-y-4">
                <img
                  src={user.logo}
                  alt="Business Logo"
                  className="w-16 h-16 mx-auto rounded-full shadow-md"
                />
                <h3 className="text-center text-lg font-bold">{user.businessName}</h3>
                <p className="text-center">{user.businessAddress}</p>
                <h4 className="text-center font-semibold">About the Business</h4>
                <p className="text-center">{user.about}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
