
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loginContext } from "../Context/LoginState";

const Navbar = () => {

  const {loginUserInfo,LogoutUser} = useContext(loginContext)

  const [openOptions, setOpenOptions] = useState(false);
  const location = useLocation()

  useEffect(() => {
    // Add an event listener to close the popup when clicking outside of it
    const handleDocumentClick = () => {
      if (openOptions) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openOptions]);


  useEffect(()=>{
    setOpenOptions(false)
  },[location])


  const handleLogout = async () =>{
    LogoutUser()
    setOpenOptions(false)
  }

  return (
    <div className="flex align-middle justify-between px-32 py-7 w-full box-border">
      <Link to="/">
        <img
          src={"/logo.png"}
          alt="logo"
          className="w-60 cursor-pointer h-5"
          />
          </Link>

      <section className="flex gap-12 relative">
      {!localStorage.getItem("jwtToken") ? <>
            <Link
              to="/login"
              className=" text-xl font-medium text-[#8A8A8A] cursor-pointer hover:scale-105 transition-transform"
            >
              Login
            </Link>
            <Link
              to="/login"
              className=" text-xl font-medium text-main-blue-01 cursor-pointer hover:scale-105 transition-transform"
            >
              Post a job
            </Link>
          </>

          :

         <img
            src={loginUserInfo?.profile ?? "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
            alt=""
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpenOptions(!openOptions);
            }}
          />}

        {openOptions && (
          <div
            className="flex items-center flex-col gap-8 shadow-2xl bg-white rounded-2xl absolute top-12 right-2 px-6 py-6 w-max z-20"
            onClick={(e) => {
              e?.stopPropagation();
            }}
          >
            <section className="flex items-center gap-4 w-full">
              <img
                src={loginUserInfo?.profile ?? "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
                alt=""
                className="rounded-full w-10 h-10 cursor-pointer"
              />

              <span className="text-sm font-bold ">
                {loginUserInfo?.name}
              </span>
            </section>

            <section className="flex flex-col gap-4 w-full text-[#757575] text-sm font-normal pl-2 ">
            <Link to={`/${localStorage.getItem("userType")}/about`}>
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Edit Profile
              </span>
              </Link>

              {localStorage.getItem("userType") === "employer" && <Link to="/employer/dashboard">
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Dashboard
              </span>
              </Link>}

              {localStorage.getItem("userType") === "employer" && <Link to="/employer/postjob">
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Post a job
              </span>
              </Link>}
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Saved List
              </span>
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold" onClick={handleLogout}>
                Logout
              </span>
            </section>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
