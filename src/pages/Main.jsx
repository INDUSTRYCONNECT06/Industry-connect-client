import { useEffect, useState } from "react";

import { SiMyspace } from "react-icons/si";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";

import heroImg from "../assets/images/heroimg.png";
import { useNavigate } from "react-router-dom";
import loaderGIF from "../assets/images/loader.gif";

const dataObj = [
  {
    title: "Signup",
    about: "Tell us what you need in a candidate in just 5-minutes.",
    icon: <SiMyspace color="white" />,
  },
  {
    title: "Connect",
    about: "Our team will call to verify your employer account",
    icon: <BsFillTelephoneFill color="white" />,
  },
  {
    title: "Hire",
    about: "You will get data & can calls the applied candidates.",
    icon: <MdDone color="white" />,
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
      setLoader(true);
      if (localStorage.getItem("userType") === "employer") {
        navigate("/search/employees");
      } else if (localStorage.getItem("userType") === "employee") {
        navigate("/search/jobs");
      }
    }

    setLoader(false);
  }, []);

  return (
    <>
      {loader && (
        <div className="w-screen h-screen flex items-center justify-center absolute z-50">
          <img src={loaderGIF} alt="Loading..." className="w-20 h-20 mb-24" />
        </div>
      )}

      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-20">
        <div className="w-full h-full gap-10 md:h-[90vh] flex items-center justify-center md:justify-between mt-10 md:px-32 px-4 box-border relative md:flex-row flex-col-reverse">
          <div className="flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-left md:gap-8 gap-3">
            <h1 className="text-3xl md:text-5xl font-semibold">
              Let&apos;s make Hiring Simpler
            </h1>

            <span className="text-[#787878] md:text-2xl text-xl w-3/4">
              Industry connect is your one-stop-centre for skilled employees.
            </span>

            <section className="flex items-center justify-start gap-10 md:gap-14 mt-8">
              <button
                className={`px-5 md:px-16 py-3 bg-gradient-to-r border border-main-blue-01 rounded-xl text-sm md:text-xl font-normal text-main-blue-01 hover:from-main-blue-02 hover:to-main-blue-01 hover:text-white`}
                onClick={() => {
                  handleClick("get");
                  setActiveButton("get");
                }}
              >
                Get a job
              </button>
              <button
                className={`px-5 md:px-16 py-3 border border-main-blue-01 bg-gradient-to-r from-main-blue-02 to-main-blue-01 rounded-xl text-sm md:text-xl font-normal hover:from-white hover:to-white hover:text-main-blue-01 text-white`}
                onClick={() => {
                  handleClick("hire");
                  setActiveButton("hire");
                }}
              >
                Hire Now
              </button>
            </section>
          </div>

          <div className="w-[250px] md:w-[500px]">
            <img src={heroImg} alt="homeback" className="w-100" />
          </div>
        </div>

        <div className="w-full md:h-screen flex flex-col justify-center items-center gap-16 md:gap-24 px-4 md:px-32 box-border">
          <h2 className="text-2xl md:text-4xl font-medium text-center">
            Get started in 3 easy steps
          </h2>

          <section className="flex w-full justify-center gap-10 md:justify-between items-start md:flex-row flex-col pb-20">
            {dataObj?.map((e, i) => {
              return (
                  <div className="card_wrapper w-full md:w-4/12 h-full md:h-[60vh] p-1" key={"card_elemnt" + i} onMouseOver={()=>{document.querySelector("#blob_wrapper"+i)?.classList.add("activate_animation")}} onMouseOut={()=>{document.querySelector("#blob_wrapper"+i)?.classList.remove("activate_animation")}}>
                    <div
                      className="flex gap-2 md:gap-14 flex-col items-center justify-center text-center w-full h-full rounded-lg py-3 md:py-6 bg-card_wrapper"
                    >
                      <div className="w-28 h-28 text-4xl md:text-6xl md:w-44 md:h-44 rounded-full bg-main-blue-01 relative flex items-center justify-center">
                        {e?.icon}
                      </div>

                      <span className="text-xl md:text-3xl font-medium">
                        {e?.title}
                      </span>
                      <p className="text-sm md:text-lg text-[#585858] font-normal w-5/6">
                        {e?.about}
                      </p>
                    </div>
                    <div className="blob_wrapper" id={"blob_wrapper"+i}></div>
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
