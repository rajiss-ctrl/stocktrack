import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import db, { storage } from "../db/firebase";

const UpdateStock = () => {
  const user = useSelector((store) => store.user.user);
  console.log(user);
  const initialState = {
    product_name: "",
    product_Qty: Number(0),
    size: "",
    product_description: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const { company_name } = data;
  const [progress, setProgress] = useState({});

  const [file, setFile] = useState(null);
  console.log(data);
  const [disAble, setDisAble] = useState(false);

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
    // if (data.length === 0) {
    //   setDisAble(true);
    // } else {
    //   setDisAble(false);
    // }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData(initialState);
    setFile(null);

    await addDoc(collection(db, "stock"), {
      user_id: user.id,
      ...data,
      // timeStamp:sererTimestamp()
    });
    // navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-t from-[rgb(8,_26,_81,_0.4)] to-white-800 bg-clip">
      <NavBar />
      <div
        className="w-full md:p-8 md:w-2/3 md:shadow 
                    mx-auto mt-8 rounded p-3 my-8 h-[100vh]"
      >
        <div
          className={`${
            progress !== null && progress < 100 ? "block" : "hidden"
          } h-[5px] bg-[green] w-[${progress}%]`}
        ></div>
        <h3 className="text-center font-bold text-xl mb-6">create stock</h3>

        <form className="w-full mx-auto flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-[4%]">
            <input
              type="text"
              required
              className=" p-3 text-sm w-full sm:w-[48%] border outline-none mb-6 rounded"
              id="productName"
              name="product_name"
              value={data.product_name}
              placeholder="Product Name"
              onChange={handleChange}
            />

            <input
              type="number"
              required
              className=" p-3 text-sm w-full sm:w-[48%] mb-6 border outline-none rounded"
              id="productQty"
              name="product_Qty"
              value={data.product_Qty}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </div>
          <select
            value={data.size}
            onChange={handleChange}
            className="signup__form-input select
          w-full text-sm bg-gray rounded p-3 border
          outline-none mb-6 form-select "
            name="size"
            id="size"
          >
            <option defaultValue>--Choose an option--</option>
            <option>Pack</option>
            <option>Carton</option>
            <option>peice</option>
            <option>Sachet</option>
            <option>Bag</option>
          </select>

          <input
            type="text"
            required
            className="p-3 text-sm outline-none border w-full mb-6 capitalize rounded"
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
            className="bg-dark-purple 
          hover:bg-dark-purp-hover 
          text-[14px] md:text-[16px] 
           text-gray-100 w-full p-[10px] md:p-5 rounded my-6"
            disabled={
              // data.product_Qty <= 0 ||
              // data.product_description === "" ||
              // data.product_name === "" ||
              // data.size === "" ||
              progress !== null && progress < 100
            }
          >
            CREATE STOCK
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStock;
