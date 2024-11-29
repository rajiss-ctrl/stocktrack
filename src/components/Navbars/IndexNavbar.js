import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../assets/img/google.svg";
import Logo from "../../assets/img/stocktrack-logo.png";
import db, { auth, logOut, useAuth } from "../../db/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setCurrentUser } from "../../features/currentUserSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const guestEmail = "stocktrack.guest@gmail.com";
  const guestPass = "stocktrack02!";
  const userData = useSelector((store) => store.buz.buzProfileData);
  const currentUser = useAuth();

  const toggleNavbar = () => {
    setNavbarOpen((prev) => !prev);
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userG = res.user;

      dispatch(setCurrentUser({ uid: userG.uid, email: userG.email }));

      sessionStorage.setItem("currentUser", JSON.stringify({ uid: userG.uid, email: userG.email }));

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuestLogin = async() => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, guestEmail, guestPass);
      const user = userCredential.user;

      // Dispatch the current user to Redux
      dispatch(setCurrentUser({ uid: user.uid, email: user.email }));

      // Store user in session storage
      sessionStorage.setItem("currentUser", JSON.stringify({ uid: user.uid, email: user.email }));

      navigate("/dashboard");
    } catch (err) {
      setServerErr("Internet issues or wrong credentials!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md text-[#2a0e51]">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} className="w-14 shadow-2xl" alt="StockTrack Logo" />
        </Link>

        {/* Navbar Toggle */}
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          {navbarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } lg:flex lg:items-center w-full lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-6 items-center md:mr-6 text-sm md:text-base">
            {currentUser?.email ? (
              <>
                <li>
                  <button
                    className="hover:text-slate-500"
                    onClick={handleLogout}
                  >
                    Log-out
                  </button>
                </li>
                <li>
                  <Link className="hover:text-slate-500" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-slate-500" to="/signinsignup">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-500" to="/signinsignup">
                    Sign-up
                  </Link>
                </li>
                <li>
                  <Link className={`hover:text-slate-500 ${currentUser?.email === undefined ? "mt-6" : "mt-4"}`} to="/dashboard">
                    Dasboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {currentUser?.email ? (
            <div className="mt-4 lg:mt-0">
              {userData.map((user) => (
                <p
                  key={user.id}
                  className="text-sm text-gray-700 mt-2 lg:mt-0 lg:ml-4"
                >
                  Welcome, {user.businessName || currentUser.email}
                </p>
              ))}
            </div>
          ) : (
            <div className="mt-4 lg:mt-0 flex gap-4">
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded shadow"
                onClick={handleGuestLogin}
              >
                Guest Login
              </button>
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-2 rounded shadow"
                onClick={signInWithGoogle}
              >
                <img src={Google} alt="Google" className="w-5" />
                <span>Google Sign-In</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {serverErr && (
        <p className="text-red-500 text-center mt-2">{serverErr}</p>
      )}
    </nav>
  );
}
