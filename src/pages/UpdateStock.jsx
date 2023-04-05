import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "@firebase/firestore";
import { db, storage } from "../db/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const UpdateStock = () => {
  const user = useSelector((store) => store.user.user);
  console.log(user);
  const initialState = {
    product_name: "",
    product_Qty: Number(0),
    product_description: "",
  };
  const [data, setData] = useState(initialState);
  const { company_name } = data;
  const [progress, setProgress] = useState({});
  const [error, setError] = useState({});
  const [file, setFile] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const upLoadTask = uploadBytesResumable(storageRef, file);

      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("uploading is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(upLoadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  /* The handleFileReader function converts the business logo (image file) to base64 */

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);

  const validates = () => {
    const error = {};
    if (!company_name) {
      error.company_name = "Company Name is required.";
    }
    return error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let errors = validates()
    // if(Object.keys(errors.length)) return setError(errors)
    setIsSubmit(true);
    await addDoc(collection(db, "stock"), {
      user_id: user.id,
      ...data,
      // timeStamp:sererTimestamp()
    });
  };

  return (
    <div className="w-full md:p-8 md:w-2/3 md:shadow mx-auto mt-8 rounded p-3 my-8">
      <h3 className="text-center font-bold text-xl mb-6">create stock</h3>

      <form className="w-full mx-auto flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          className="py-2 px-4 bg-[rgb(250,_228,_232)] w-full mb-6 rounded"
          id="productName"
          name="product_name"
          value={data.product_name}
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          type="number"
          required
          className="py-2 px-4 bg-[rgb(250,_228,_232)] w-full mb-6 capitalize rounded"
          id="productQty"
          name="product_Qty"
          value={data.product_Qty}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <input
          type="text"
          required
          className="py-2 px-4 bg-[rgb(250,_228,_232)] w-full mb-6 capitalize rounded"
          id="description"
          name="product_description"
          value={data.product_description}
          onChange={handleChange}
          placeholder="Product Description"
        />

        <div className="flex items-center space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            {/* <img src={productImg} alt="Logo" className=" w-full max-h-[300px]" /> */}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="logo" className="text-sm mb-1">
              Upload Product Picture.
            </label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full mb-6  rounded"
              id="productImg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[rgb(255,_101,_132)] text-[14px] md:text-[16px] text-gray-100 w-full p-[10px] md:p-5 rounded my-6"
          disabled={progress !== null && progress < 100}
        >
          CREATE STOCK
        </button>
      </form>
    </div>
  );
};

export default UpdateStock;
