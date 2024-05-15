
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import mixpanel from "mixpanel-browser";
import SeoTagger from "../components/SeoTagger";

const Popup = ({Close}) => {

  const handleClick = (value) => {
    localStorage.setItem("userType", value === "get" ? "employee" : "employer");
    Close()
  };

  return (
    <div className="bg-[#65646490] w-full h-full z-10 fixed top-0 left-0 flex items-center justify-center">
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-8 py-10 md:px-[52px] md:py-[107px] shadow-black rounded-md bg-white">
        <h1 className="text-xl font-semibold">You Want To </h1>
        <button className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg  text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
          onClick={()=>{handleClick("get");mixpanel.track("Get a job on Popup")}}
        >
          Get a job
        </button>
        <button className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
          onClick={()=>{handleClick("hire");mixpanel.track("Hire Now on Popup")}}
        >
          Hire Now
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [selectedPosition, setSelectedPosition] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("userType")){
      setSelectedPosition(false)
    }
    else{
      setSelectedPosition(true)
    }

  }, [])


  const handleGoogleLogin = async () =>{
    mixpanel.track("Sign in with google")
    window.open(`${import.meta.env.VITE_HOST}/api/google/auth`, "_self");
  }

  
  return (
    <>
      {selectedPosition && <Popup Close={()=>{setSelectedPosition(false)}}/>}
      <div className="flex items-center justify-center w-full my-16">
        <div className="flex flex-col gap-8 md:gap-10 items-center justify-center md:border md:border-[#E6E6E6] px-6 py-10 md:px-[52px] md:py-[107px] shadow-black rounded-md w-max">
          <h1 className="text-xl font-semibold text-center">
            Continue with{" "}
            {window.screen.width < 600 &&<br/>}
            <span className="uppercase text-main-blue-01">
              Industry Connect
            </span>
          </h1>

          <button className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg  text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
           onClick={handleGoogleLogin}
          >
            <FcGoogle size={25} /> Sign In with Google
          </button>
          {/* <button className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center">
            <BsFacebook size={25} color="#000AFF"/> Sign In with Facebook
          </button> */}

          <span className="w-3/4 text-sm text-[#0000008A] text-center">
            By continuing, I agree to the Terms of Use & Privacy Policy
          </span>
        </div>
      </div>


      <SeoTagger title={"Login | INDUSTRY CONNECT"} description={"Access your candidate account on to manage applications, update your profile, and discover new career opportunities"}/>
    </>
  );
};

export default Login;
