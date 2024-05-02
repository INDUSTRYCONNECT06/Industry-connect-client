
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-main-blue-01 w-full py-10 md:py-20 flex flex-col items-center justify-center text-center">
      <section className="flex m-8 items-center gap-8 md:gap-14 md:flex-row flex-col">
        <button className=" px-20 py-2 border border-white bg-white rounded-md text-sm md:text-xl font-normal text-main-blue-01 hover:bg-main-blue-01 hover:text-white" onClick={()=>{navigate("/search/employees")}}>
          Get a job
        </button>
        <button className="  px-20 py-2 border border-white bg-white rounded-md text-sm md:text-xl font-normal text-main-blue-01 hover:bg-main-blue-01 hover:text-white" onClick={()=>{navigate("/search/jobs")}}>
          Hire Now
        </button>
      </section>

      <span className="text-md text-[#FEFEFE] font-light mb-10 md:mb-5 cursor-pointer underline">
        Connect with us
      </span>

      <span className="text-xs md:text-lg text-[#FEFEFE] font-light">
        © 2023 INDUSTRY CONNECT. All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
