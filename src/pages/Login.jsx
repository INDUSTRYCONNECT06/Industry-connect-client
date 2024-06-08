import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import mixpanel from "mixpanel-browser";
import SeoTagger from "../components/SeoTagger";
import { IoIosArrowDropleftCircle, IoMdMail } from "react-icons/io";
import { employerContext } from "../Context/EmployerState";

const Popup = ({ Close }) => {
  const handleClick = (value) => {
    localStorage.setItem("userType", value === "get" ? "employee" : "employer");
    Close();
  };

  return (
    <div className="bg-[#65646490] w-full h-full z-10 fixed top-0 left-0 flex items-center justify-center">
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-8 py-10 md:px-[52px] md:py-[107px] shadow-black rounded-md bg-white">
        <h1 className="text-xl font-semibold">You Want To </h1>
        <button
          className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg  text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
          onClick={() => {
            handleClick("get");
            mixpanel.track("Get a job on Popup");
          }}
        >
          Get a job
        </button>
        <button
          className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
          onClick={() => {
            handleClick("hire");
            mixpanel.track("Hire Now on Popup");
          }}
        >
          Hire Now
        </button>
      </div>
    </div>
  );
};

const EmailSignin = ({setSelectEmailLogin}) => {
  const [data, setData] = useState({email:"",password:""})

  const {loginEmployer} = useContext(employerContext)

  const handleChange = (e) =>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSignin = async (e) =>{
    e?.preventDefault()
    await loginEmployer({...data,"loginUsing":"email"})
  }


  return (
    <div className="flex items-center justify-center w-full my-16">
      <div className="flex flex-col gap-8 md:gap-10 items-center justify-center md:border md:border-[#E6E6E6] px-6 py-10 md:px-[52px] md:py-[107px] shadow-black rounded-md w-max relative">
      <IoIosArrowDropleftCircle className="absolute left-5 top-5 text-2xl cursor-pointer hover:scale-105 transition-transform" onClick={()=>{setSelectEmailLogin(false)}}/>
        <h1 className="text-xl font-semibold text-center">
          Continue with {window.screen.width < 600 && <br />}
          <span className="uppercase text-main-blue-01">Industry Connect</span>
        </h1>

        <form className="w-full flex flex-col gap-10 items-center" onSubmit={handleSignin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-[242px] bg-main-blue-01 rounded-lg py-2 md:py-3 text-sm md:text-xl text-white hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </form>

        <span className="w-3/4 text-sm text-[#0000008A] text-center">
          By continuing, I agree to the Terms of Use & Privacy Policy
        </span>
      </div>
    </div>
  );
};

const Login = () => {
  const [selectedPosition, setSelectedPosition] = useState(false);
  const [selectEmailLogin, setSelectEmailLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userType")) {
      setSelectedPosition(false);
    } else {
      setSelectedPosition(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    mixpanel.track("Sign in with google");
    window.open(`${import.meta.env.VITE_HOST}/api/google/auth`, "_self");
  };

  const handleEmailLogin = async () => {
    mixpanel.track("Sign in with email");
    setSelectEmailLogin(true);
  };

  return (
    <>
      {selectedPosition && (
        <Popup
          Close={() => {
            setSelectedPosition(false);
          }}
        />
      )}

      {selectEmailLogin ? (
        <EmailSignin  setSelectEmailLogin={setSelectEmailLogin}/>
      ) : (
        <div className="flex items-center justify-center w-full my-16">
          <div className="flex flex-col gap-8 md:gap-10 items-center justify-center md:border md:border-[#E6E6E6] px-6 py-10 md:px-[52px] md:py-[107px] shadow-black rounded-md w-max">
            <h1 className="text-xl font-semibold text-center">
              Continue with {window.screen.width < 600 && <br />}
              <span className="uppercase text-main-blue-01">
                Industry Connect
              </span>
            </h1>

            <button
              className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg  text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={25} /> Sign In with Google
            </button>
            {localStorage.getItem("userType") === "employer" && (
              <button
                className="w-72 md:w-96 px-10 md:px-20 py-4 border border-[rgba(117, 117, 117, 0.11)] rounded-lg text-md font-normal text-[#0000008A] transition-transform hover:scale-105 hover:bg-main-blue-01 hover:text-white flex items-center gap-4 justify-center"
                onClick={handleEmailLogin}
              >
                <IoMdMail size={25} /> Sign In with Email
              </button>
            )}

            <span className="w-3/4 text-sm text-[#0000008A] text-center">
              By continuing, I agree to the Terms of Use & Privacy Policy
            </span>
          </div>
        </div>
      )}

      <SeoTagger
        title={"Login | INDUSTRY CONNECT"}
        description={
          "Access your candidate account on to manage applications, update your profile, and discover new career opportunities"
        }
      />
    </>
  );
};

export default Login;
