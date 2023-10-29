import { useEffect, useState } from "react";

import { SiMyspace } from "react-icons/si";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";

import mainImg from "../assets/images/industry.png";
import { useNavigate } from "react-router-dom";
import loaderGIF from "../assets/images/loader.gif";

const dataObj = [
  {
    title: "Signup",
    about: "Tell us what you need in a candidate in just 5-minutes.",
    icon: <SiMyspace color="white" size={70} />,
  },
  {
    title: "Connect",
    about: "Our team will call to verify your employer account",
    icon: <BsFillTelephoneFill color="white" size={70} />,
  },
  {
    title: "Hire",
    about:
      "You will get calls from relevant candidates within one hour or call them directly from  candidate database.",
    icon: <MdDone color="white" size={70} />,
  },
];

const Main = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const [loader, setLoader] = useState(false);

  const handleClick = (value) => {
    if (!localStorage.getItem("jwtToken")) {
      localStorage.setItem(
        "userType",
        value === "get" ? "employee" : "employer"
      );

      navigate("/login");
    }
  };

  // main page not exist after user login
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setLoader(true)
      if (localStorage.getItem("userType") === "employer") {
        navigate("/search/employees");
      } else if (localStorage.getItem("userType") === "employee") {
        navigate("/search/jobs");
      }
    }

    setLoader(false)
  }, []);
  

  return (
    <>
      {loader && (
        <div className="w-screen h-screen flex items-center justify-center absolute z-50">
          <img src={loaderGIF} alt="Loading..." className="w-20 h-20 mb-24" />
        </div>
      )}

      <div className="w-full min-h-screen">
        <div className="w-full h-[90vh] flex items-center justify-between -mt-7 px-32 box-border relative">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-semibold">
              Let&apos;s make Hiring Simpler
            </h1>

            <span className="text-[#787878] text-2xl w-3/4">
              Industry connect is your one-stop-centre for skilled employees.
            </span>

            <section className="flex items-center justify-start gap-14 mt-8">
              <button
                className={`px-20 py-2 border border-main-blue-01 rounded-md text-xl font-normal ${
                  activeButton === "get"
                    ? "text-white bg-main-blue-01"
                    : "text-main-blue-01 bg-transparent"
                }  hover:bg-main-blue-01 hover:text-white`}
                onClick={() => {
                  handleClick("get");
                  setActiveButton("get");
                }}
              >
                Get a job
              </button>
              <button
                className={`px-20 py-2 border border-main-blue-01 rounded-md text-xl font-normal ${
                  activeButton === "hire"
                    ? "text-white bg-main-blue-01"
                    : "text-main-blue-01 bg-transparent"
                } hover:bg-main-blue-01 hover:text-white`}
                onClick={() => {
                  handleClick("hire");
                  setActiveButton("hire");
                }}
              >
                Hire Now
              </button>
            </section>
          </div>

          <div className="w-[750px] h-[650px] absolute right-0 mt-16">
            <img
              src={mainImg}
              alt="homeback"
              //   className="absolute right-0 top-24"
            />
          </div>
        </div>

        <div className="w-full h-screen flex flex-col justify-center items-center gap-24 px-32 box-border">
          <h2 className="text-4xl font-medium">Get started in 3 easy steps</h2>

          <section className="flex w-full justify-between items-start">
            {dataObj?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex gap-14 flex-col items-center justify-center text-center w-4/12"
                >
                  <div className="w-52 h-52 rounded-full bg-main-blue-01 relative flex items-center justify-center">
                    {e?.icon}
                  </div>

                  <span className="text-3xl font-medium">{e?.title}</span>
                  <p className="text-lg text-[#585858] font-normal w-5/6">
                    {e?.about}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default Main;
