import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import db, { storage, useAuth } from "../db/firebase";
import {
  FaMoneyBill,
  FaPrescription,
  FaProductHunt,
  FaSortNumericUp,
} from "react-icons/fa";
import StockInput from "../components/StockInput";

const inputs = [
  {
    id: 1,
    name: "product_name",
    type: "text",
    errMessages: "Product Name should not be nore than 20 character long",
    placeholder: "Product Name",
    label: "Product Name",
    icon: <FaProductHunt />,
    required: true,
  },
  {
    id: 2,
    name: "product_Qty",
    type: "number",
    errMessages: "Product quantity should inserted!",
    placeholder: "Product Quantity",
    label: "Product quantity",
    icon: <FaSortNumericUp />,
    required: true,
  },
  {
    id: 3,
    name: "product_Price",
    type: "number",
    errMessages: "Must be number!",
    placeholder: "Product price",
    label: "Product price",
    icon: <FaMoneyBill />,
    // pattern: `^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$`,
    required: true,
  },
  {
    id: 4,
    name: "product_description",
    type: "text",
    errMessages: "Describe the product!",
    placeholder: "Product description",
    label: "Product description",
    icon: <FaProductHunt />,
    // pattern: `^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$`,
    required: true,
  },
];

const UpdateStock = () => {
  const user = useSelector((store) => store.user.user);
  // console.log(user);
  const currentUser = useAuth();
  // console.log(currentUser?.uid);

  const initialState = {
    product_name: "",
    product_Qty: Number(),
    product_Price: Number(),
    size: "",
    product_description: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  // const { company_name } = data;
  const [progress, setProgress] = useState({});
  const [serverErr, setServerErr] = useState("");

  const [file, setFile] = useState(null);
  // console.log(data);

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
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("uploading is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          if (error) {
            let error = "Internet Problems";
            setServerErr(error);
          }
          // console.log(error);
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

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleStock = async (e) => {
    e.preventDefault();
    setData(initialState);
    setFile(null);

    await addDoc(collection(db, "stock"), {
      user_id: currentUser?.uid,
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
        <h3 className="text-center font-bold text-xl mb-6">create stock</h3>
        <div
          className={`${
            progress !== null && progress < 100 ? "block" : "hidden"
          } h-[5px] mb-2 bg-[green] w-[${progress}%]`}
        ></div>

        <form className="w-full mx-auto flex flex-col" onSubmit={handleStock}>
          <div className="flex flex-col w-full">
            {inputs.map((input) => {
              return (
                <StockInput
                  key={input.id}
                  {...input}
                  value={data[input.name]}
                  onChange={onChange}
                />
              );
            })}
            <select
              value={data.size}
              required
              onChange={onChange}
              className="signup__form-input select
                w-full text-sm bg-gray rounded p-3 border
                outline-none mb-6 form-select "
              name="size"
              id="size"
            >
              <option defaultValue>--Choose an option--</option>
              <option>Pk</option>
              <option>Ctn</option>
              <option>pc</option>
              <option>Scht</option>
              <option>Bag</option>
            </select>
          </div>
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
              hover:bg-dark-purp-hover text-gray-100 w-full p-[10px] md:p-5 rounded my-6"
            disabled={progress !== null && progress < 100}
          >
            Add To Stock
          </button>
        </form>
        <p className="text-[red]">{serverErr}</p>
      </div>
    </div>
  );
};

export default UpdateStock;
