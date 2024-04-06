import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


import db, { storage, useAuth } from "../db/firebase";
import {
  FaCloudUploadAlt,
  FaMoneyBill,
  FaProductHunt,
  FaSortNumericUp,
} from "react-icons/fa";
import StockInput from "../components/StockInput";

const inputs = [
  {
    id: 1,
    name: "product_name",
    type: "text",
    errMessages: "Product name cannot be empty or blank.",
    successMessage: "Acknowledged compliance for Product Name.",
    placeholder: "Product Name",
    label: "Product Name",
    icon: <FaProductHunt />,
    required: true,
  },
  {
    id: 2,
    name: "product_Qty",
    type: "number",
    errMessages: "Please provide the product quantity.",
    successMessage: "Acknowledged compliance for product quantity.",
    placeholder: "Product Quantity (0000)",
    label: "Product Quantity",
    icon: <FaSortNumericUp />,
    required: true,
  },
  {
    id: 3,
    name: "product_Price",
    type: "number",
    errMessages: "Please enter a valid number for product price.",
    successMessage: "Acknowledged compliance for product Price.",
    placeholder: "Product Price (0000)",
    label: "Product Price",
    icon: <FaMoneyBill />,
    required: true,
  },
  {
    id: 4,
    name: "product_description",
    type: "text",
    errMessages: "Please provide a description for the product.",
    placeholder: "Product Description",
    label: "Product Description",
    icon: <FaProductHunt />,
    required: false,
  },
];



const UpdateStock = ({handleRestock}) => {
  // const user = useSelector((store) => store.user.user);
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
  // const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  // const { company_name } = data;
  const [progress, setProgress] = useState({});
  const [serverErr, setServerErr] = useState("");

  const [file, setFile] = useState(null);
  // console.log(data);

  useEffect(() => {
    const uploadFile = () => {
      if (file) { // Check if a file is present before initiating upload
        const fileName = new Date().getTime() + file.name; // Generate unique file name
        const storageRef = ref(storage, fileName); // Use the generated file name
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Uploading is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            if (error) {
              // Update serverErr state in case of errors
              setServerErr("Internet Problems");
            }
            // console.log(error);
          },
          () => {
            // Once upload is complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Update data state with the download URL
              setData((prevData) => ({ ...prevData, img: downloadURL }));
            });
          }
        );
      }
    };
  
    uploadFile(); // Call the uploadFile function
  }, [file]); // Dependency array includes only 'file'
  
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
  // bg-[rgba(0, 0, 0, 0.464)] bg-blend-darken
  return (
    // <div className="bg-gradient-to-t from-[rgb(8,_26,_81,_0.4)] to-white-800 bg-clip">
    <div className=" bg-gradient-to-t from-[rgba(69,69,70,0.4)] to-white-200 bg-clip z-[100000] w-full h-full fixed top-0 right-0">
      
      <div
        className="w-full bg-white  md:w-[50%] md:shadow 
                    mx-auto  md:mt-1 rounded p-6 "
      >
        <div className="mb-6 flex justify-between items-center">
        <h3 className="mb-2 uppercase font-bold text-xs ">add New Item To the inventory</h3>
        <div className="shadow-md flex justify-center items-center text-gray-500 hover:text-red-500  w-[30px] h-[30px]  rounded-[50%] border border-[#213A84] hover:border-red-500 cursor-pointer transition duration-300 transform hover:scale-110">
        <i onClick={handleRestock} class="fas fa-times "></i>
        </div>
        </div>
        <div
          className={`${
            progress !== null && progress < 100 ? "block" : "hidden"
          } h-[5px] mb-2 bg-[green] w-[${progress}%]`}
        ></div>

        <form className=" mx-auto flex flex-col" onSubmit={handleStock}>
          <div className="flex flex-col w-full">
            {inputs.map((input) => {
              return (
                <StockInput
                key={input.id}
                {...input}
                type={input.type}  
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
                outline-none mb-2 form-select  text-gray-500"
              name="size"
              id="size"
            >
              <option className="uppercase" defaultValue>Choose packaging size</option>
              <option>Pack</option>
              <option>Carton</option>
              <option>peice</option>
              <option>Sachet</option>
              <option>Bag</option>
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <div className="flex flex-col w-1/2">
              {/* <img src={productImg} alt="Logo" className=" w-full max-h-[300px]" /> */}
            </div>

            {/* <div className="flex ">
              <div htmlFor="product" className="text-sm ">
                Upload Image.
              </div>
              <input
                type="file"
                accept="image/*"
                required
                className="  rounded"
                id="productImg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div> */}


        <div className="w-full">
          <label
            htmlFor="productImg"
            className="w-full flex items-center text-green-300 text-xs sm:text-sm font-bold pb-2 px-4 border-0 cursor-pointer"
          >
            <FaCloudUploadAlt className="mr-2 text-sm cursor-pointer" /> Item Image
            <input
              accept="image/*"
              required
              id="productImg"
              // className="opacity-0 absolute cursor-pointer"
              style={{display:"none"}}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

          </div>
          <button
            type="submit"
            className="bg-dark-purple uppercase text-sm
              hover:bg-dark-purp-hover text-gray-100 w-full p-[10px] md:p-2 rounded"
            disabled={progress !== null && progress < 100}
          >
            Add Item
          </button>
        </form>
        <p className="text-[red]">{serverErr}</p>
      </div>
    </div>
  );
};

export default UpdateStock;
