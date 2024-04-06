import React from "react";
import { Outlet } from "react-router-dom";



const Layout = () => {
  // const location = useLocation();
  // const currentRoutePath = location.pathname;
  return (
    <div className="overflow-y-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 flex flex-col justify-center min-[100vh]"
    style={{
      /* Custom CSS for styling the scrollbar */
      /* For Webkit Browsers (Chrome, Safari) */
      WebkitScrollbar: 'width: 12px',
      WebkitScrollbarThumb: 'background-color: #3b82f6; border-radius: 6px',
      WebkitScrollbarTrack: 'background-color: #eff6ff; border-radius: 6px',
      /* For Firefox */
      scrollbarWidth: 'thin',
      scrollbarColor: '#3b82f6 #eff6ff',
    }}
    >
      {/* <NavBar /> */}
      <Outlet />
      {/* <div className={`${
                currentRoutePath !== "/dashboard" ? "hidden" : "block"
              }`}>
       </div> */}
    </div>
  );
};

export default Layout;
