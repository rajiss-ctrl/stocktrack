import { FaOpencart, FaTimes, FaBars, FaGoogle } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import { useToggle } from "../custom-hooks/useToggle";
import db, { auth, useAuth } from "../db/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const NavBar = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoutePath = location.pathname;

  const [isVisible, toggle] = useToggle();

  //style={({isActive})=> isActive ? {borderBottom:'2px solid red'} : {borderBottom:'none'} }

  //google sign in click function
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      // signInWithRedirect
      // signInWithPopup
      const res = await signInWithPopup(auth, googleProvider);
      const userG = res.user;

      const q = query(collection(db, "users"), where("uid", "==", userG.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: userG.uid,
          name: userG.displayName,
          authProvider: "google",
          email: userG.email,
        });
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <nav
      className="static z-[20px] overflow-hidden top-0 
    bg-transparent px-[20px] less_sm:px-10 text-white"
    >
      <div
        className={`${
          isVisible ? "h-[200px]" : "h-[auto]"
        } relative md:static  flex md:items-center  font-[400]
        justify-between py-[5px] sm:py-0 rounded-full`}
      >
        <NavLink to="/">
          <div className="">
            {/* <img className="w-[50px] less_sm:w-[70px]" src={Logo} alt="logo" /> */}
            <div
              className={`${
                currentRoutePath != "/" ? "text-dark-purple" : "text-white"
              } text-2xl shadow-lg  font-[400] sm:font-[600]`}
            >
              <h2>
                <span className="text-[rgb(247,_193,_0)]">S</span>tock
                <span className="text-[rgb(247,_193,_0)]">T</span>rack
              </h2>
            </div>
          </div>
        </NavLink>

        <ul
          className={`${
            isVisible ? "block duration-500" : "hidden duration-300"
          } ${
            currentRoutePath != "/" ? "text-black " : "text-white"
          } ' w-[100%] md:w-[auto] 
          absolute duration-300 md:static left-[0px] top-[50px] 
           md:flex md:justify-center items-center  
            sm:gap-[0] md:gap-[20px] text-xl sm:text-[1.15rem] font-[300] `}
        >
          <NavLink to="/">
            <li
              className="list-[none]  
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-dark-purple hover:text-[#c6b9b9] 
          py-[6px] md:py-[24px]"
            >
              <span>Home</span>
            </li>
          </NavLink>
          <NavLink to="/stock">
            <li
              className={`${
                currentUser?.email != null ? "block" : "hidden"
              } list-[none]  
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-dark-purple hover:text-[#c6b9b9] 
          py-[6px] md:py-[24px]`}
            >
              <span>Store</span>
            </li>
          </NavLink>

          {currentUser?.email != null ? (
            <NavLink to="/updatestock">
              <li
                className="list-[none]
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-dark-purple hover:text-[#c6b9b9] 
          py-[6px] md:py-[24px]"
              >
                <span>Update Store</span>
              </li>
            </NavLink>
          ) : (
            <Link to="signup">
              <li
                className="list-[none]
                w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
                md:hover:border-b-4 cursor-pointer
                md:hover:border-dark-purple hover:text-[#c6b9b9] 
                py-[6px] md:py-[24px]"
              >
                <span>Sign Up</span>
              </li>
            </Link>
          )}

          {currentUser?.email != null ? (
            <NavLink to="/dashboard">
              <li
                className="list-[none]
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-dark-purple hover:text-[#c6b9b9] 
          py-[6px] md:py-[24px]"
              >
                <span>Dashboard</span>
              </li>
            </NavLink>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="-ml-3 md:-ml-0  bg-black text-white hover:bg-[#535252]  rounded-2xl  py-2 px-3 outline-none border-0 md:px-4 sm:py-2"
            >
              <li
                className="
              
                list-[none] w-[100%]   md:w-[auto]  "
              >
                <span className="flex text-sm duration-300 hover:duration-300 items-center gap-2">
                  Quick Sign In with <FaGoogle className="text-[red] text-sm" />
                </span>
              </li>
            </button>
          )}
        </ul>
        <div className="flex h-[40px] md:h-[auto] items-center gap-[18px]">
          <div
            className={`${
              currentRoutePath != "/" ? "text-dark-purple" : "text-white"
            } cursor-[pointer] text-[20px] less_sm:text-[21px]`}
          >
            <NavLink to="/dashboard">
              <RiDashboardFill />
            </NavLink>
          </div>
          <div
            className={`${
              currentRoutePath != "/" ? "text-dark-purple" : "text-white"
            } cursor-[pointer] text-[20px] less_sm:text-[21px]`}
          >
            <FaOpencart />
          </div>
        </div>
        <div
          className={`${
            currentRoutePath != "/" ? "text-dark-purple" : "text-white"
          } h-[35px] w-[35px] 
         text-[#999999] md:hidden 
        md:h-[auto] flex items-center justify-center`}
        >
          <div
            onClick={toggle}
            className={`${
              isVisible ? "block" : "hidden"
            } font-[400] duration-300 text-[17px] less_sm:text-[24px] cursor-pointer`}
          >
            <FaTimes />
          </div>
          <div
            onClick={toggle}
            className={`${
              isVisible ? "hidden" : "block"
            } font-[400] duration-300 text-[17px] less_sm:text-[24px] cursor-pointer`}
          >
            <FaBars />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
