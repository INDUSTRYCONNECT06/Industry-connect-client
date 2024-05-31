import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loginContext } from "../Context/LoginState";
import mixpanel from "mixpanel-browser";

const Navbar = () => {
  const { loginUserInfo, LogoutUser } = useContext(loginContext);

  const [openOptions, setOpenOptions] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setOpenOptions(false);
  }, [location]);

  const handleLogout = async () => {
    LogoutUser();
    setOpenOptions(false);
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-32 md:py-7 py-4 w-full box-border">
      <Link to="/" onClick={()=>{mixpanel.track("Logo Clicked on Navbar")}}>
        <img src={"/logo.png"} alt="logo" className="w-36 md:w-60 cursor-pointer" onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
        }}/>
      </Link>

      <section className="flex gap-4 md:gap-12 relative">
        {!localStorage.getItem("jwtToken") ? (
          <>
            <Link
              to="/login"
              onClick={()=>{mixpanel.track("Login Clicked on Navbar")}}
              className="text-sm md:text-xl font-medium text-[#8A8A8A] cursor-pointer hover:scale-105 transition-transform"
            >
              Login
            </Link>
           {window.screen.width > 600 && <Link
              to="/login"
              onClick={()=>{mixpanel.track("Post a Job Clicked on Navbar")}}
              className="text-sm md:text-xl font-medium text-main-blue-01 cursor-pointer hover:scale-105 transition-transform"
            >
              Post a job
            </Link>}
          </>
        ) : (
          <>
            {localStorage.getItem("userType") === "employer" && window.location.pathname !== "/employer/dashboard" && <Link
              to="/employer/dashboard"
              onClick={()=>{mixpanel.track("Dashboard Clicked on Navbar")}}
              className="text-[10px] md:text-sm font-medium text-main-blue-01 cursor-pointer hover:scale-105 mt-2 transition-transform"
            >
              Dashboard
            </Link>}


            <span
              onClick={()=>{mixpanel.track("Help & Support Clicked on Navbar");window.open(`https://wa.me/${919650082864}`)}}
              className="text-[10px] md:text-sm font-medium text-main-blue-01 cursor-pointer hover:scale-105 mt-2 transition-transform"
            >
              Help & Support
            </span>

            <img
              src={
                loginUserInfo?.profile
              }
              alt=""
              className="rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenOptions(!openOptions);
                mixpanel.track("Profile Clicked on Navbar")
              }}
            />
          </>
        )}

        {openOptions && (
          <div
            className="flex items-center flex-col gap-8 shadow-2xl bg-white rounded-2xl absolute top-12 right-2 px-6 py-6 w-max z-20"
            onClick={(e) => {
              e?.stopPropagation();
            }}
          >
            <section className="flex items-center gap-4 w-full">
              <img
                src={
                  loginUserInfo?.profile ??
                  "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
                }
                alt=""
                className="rounded-full w-10 h-10 cursor-pointer"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                }}
              />

              <span className="text-sm font-bold ">{loginUserInfo?.name}</span>
            </section>

            <section className="flex flex-col gap-4 w-full text-[#757575] text-sm font-normal pl-2 ">
              <Link to={`/${localStorage.getItem("userType")}/about`} onClick={()=>{mixpanel.track("Edit profile Clicked on Navbar Options")}}>
                <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                  Edit Profile
                </span>
              </Link>

              {localStorage.getItem("userType") === "employer" && (
                <Link to="/employer/postjob" onClick={()=>{mixpanel.track("Post Job Clicked on Navbar Options")}}>
                  <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                    Post a job
                  </span>
                </Link>
              )}

{localStorage.getItem("userType") === "employee" && <Link to="/employee/saved" onClick={()=>{mixpanel.track("Saved jobs Clicked on Navbar Options")}}>
              <span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Saved List
              </span></Link>}

              {localStorage.getItem("userType") === "employee" && <Link to="/employee/applied" onClick={()=>{mixpanel.track(" Connect With Us Clicked on Navbar Options")}}><span className="cursor-pointer hover:text-main-blue-01 hover:font-semibold">
                Applied Jobs
              </span></Link> }
              <span
                className="cursor-pointer hover:text-main-blue-01 hover:font-semibold"
                onClick={()=>{window.open("https://www.linkedin.com/in/industry-connect-4a6119300")}}
              >
                Connect With Us
              </span>

              <span
                className="cursor-pointer hover:text-main-blue-01 hover:font-semibold"
                onClick={()=>{window.open("https://docs.google.com/forms/d/e/1FAIpQLScn2xEQCijxmQrCN4U3MuDru6cUec7TJNYP7OI5OzGR_d6Hpg/viewform?usp=sf_link");mixpanel.track("Feedback clicked")}}
              >
                Feedback
              </span>

              <span
                className="cursor-pointer hover:text-main-blue-01 hover:font-semibold"
                onClick={()=>{handleLogout();mixpanel.track("Logout Clicked on Navbar Options")}}
              >
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
