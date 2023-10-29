import { AiOutlineClockCircle } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmployeeCard = () => {
  return (
    <div className="w-full bg-white box-border p-6 flex items-start gap-6 relative pb-20">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/2/25/Chris_Evans_SDCC_2014.jpg"
        }
        alt="employee"
        className="w-16 h-16 rounded-md"
      />
      <section className="flex flex-col gap-1">
        <h5 className="text-md text-[#141414] font-normal">Linear company</h5>
        <h3 className="text-xl text-[#141414] font-semibold ">
          Software Engineer
        </h3>

        <div className="flex gap-12 text-[#141414b2] text-sm mt-1">
          <span className="flex items-center gap-1">
            <CiLocationOn size={18} /> Brussels
          </span>
          <span className="flex items-center gap-1">
            <AiOutlineClockCircle /> Full time
          </span>
          <span className="flex items-center gap-1">
            <MdAttachMoney />
            50-55k
          </span>
          <span className="flex items-center gap-1">
            <SlCalender /> 29 min ago
          </span>
        </div>

        <p className="text-sm text-[#141414] font-normal mt-2">
          Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt.
          Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum
          tempor Lorem incididunt.
        </p>
      </section>

      <BsBookmark
        size={20}
        color="#000AFF"
        className="absolute right-6 top-6 cursor-pointer hover:scale-105 transition-transform"
      />

      <div className="absolute right-6 bottom-6">
        <button className="bg-main-blue-01 text-white px-14 py-2 hover:scale-105 transition-transform">
          Call Now
        </button>
      </div>
    </div>
  );
};

const SearchEmployee = () => {
  const navigate = useNavigate();

  // prevneting the employer to access this -------------------
  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") &&
      localStorage.getItem("userType") !== "employer"
    ) {
      navigate("/search/jobs");
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-10">
      <h1 className="text-4xl font-bold uppercase">
        SEARCH <span className="text-main-blue-01">EMPLOYEES</span>
      </h1>
      <span className="text-xl mb-6">
        Thousands of employees in the computer, engineering and technology
        sectors are waiting for you.
      </span>
      <SearchBar />

      <section className="w-[85vw] p-10 bg-[#FAFAFA] my-10 flex items-start justify-between h-max">
        {/* Filters section ------------------ */}
        <div className="bg-white w-[250px] p-6 box-border">
          <h2 className="text-xl font-bold">Filters</h2>
        </div>

        {/* Employee list */}
        <div className="w-3/4 p-6 ">
          <div className="mb-6">
            <span className="text-3xl font-semibold">3177 Employees</span>
          </div>

          <section className="w-full flex flex-col gap-8">
            <EmployeeCard />
            <EmployeeCard />
            <EmployeeCard />
            <EmployeeCard />
            <EmployeeCard />
            <EmployeeCard />
          </section>
        </div>
      </section>
    </div>
  );
};

export default SearchEmployee;
