
import { BsBookmark } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import SearchBar from "../../components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../helpers/useFetch";

const EmployeeCard = ({name,profile,location,educationDetails,experienceDetails,skills}) => {
  return (
    <div className="w-full bg-white box-border p-6 flex items-start gap-6 relative pb-20">
      <img
        src={profile}
        alt="employee"
        className="w-16 h-16 rounded-md"
      />
      <section className="flex flex-col gap-1">
        <h5 className="text-md text-[#141414] font-normal">{name}</h5>
        <h3 className="text-xl text-[#141414] font-semibold ">
          {experienceDetails[0]?.jobRole}
        </h3>

        <div className="flex gap-12 text-[#141414b2] text-sm mt-1">
          <span className="flex items-center gap-1">
            <CiLocationOn size={18} /> {location}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineBookOpen /> {educationDetails?.degree}, {educationDetails?.field}
          </span>
        </div>


        <section className="flex items-center gap-4 mt-4">
          {skills?.map((e,i)=>{
            return <span key={i} className="bg-[#000aff8a] text-white px-3 py-1 rounded-md">
              {e}
            </span>
          })}
        </section>


      </section>

      <BsBookmark
        size={20}
        color="#000AFF"
        className="absolute right-6 top-6 cursor-pointer hover:scale-105 transition-transform"
      />

      <div className="absolute right-6 bottom-6">
        <button className="bg-main-blue-01 text-white px-14 py-2 hover:scale-105 transition-transform">
          Message
        </button>
      </div>
    </div>
  );
};

const SearchEmployee = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const position = searchParams.get("position");
  const location = searchParams.get("location");

  const [filterData, setFilterData] = useState({
    employment: null,
    salary: null,
    exp: null,
  });

  const [finalData, setFinalData] = useState();

  let { data: aboutData } = useFetch(
    `${
      import.meta.env.VITE_HOST
    }/api/search/employees?position=${position}&location=${location}&noLogin=${
      !localStorage.getItem("jwtToken") ? "true" : "false"
    }`,
    "get",
    {
      headers: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    }
  );

  const handleChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.id });
  };

  // // handling the filter and again showing the data ---------------
  // useEffect(() => {
  //   const employmentFilter = (job) => {
  //     if (filterData?.employment) {
  //       return job?.jobData?.jobType?.includes(filterData?.employment);
  //     }
  //     return true; // No filter applied
  //   };

  //   const salaryFilter = (job) => {
  //     if (filterData?.salary) {
  //       return parseInt(job?.jobData?.salary) > parseInt(filterData?.salary);
  //     }
  //     return true; // No filter applied
  //   };

  //   const expFilter = (job) => {
  //     if (filterData?.exp) {
  //       return parseInt(job?.jobData?.experience) < parseInt(filterData?.exp);
  //     }
  //     return true;
  //   };

  //   // Apply the filters to the data
  //   const filteredData = aboutData?.jobs?.filter((job) => {
  //     return employmentFilter(job) && salaryFilter(job) && expFilter(job);
  //   });

  //   setFinalData(filteredData);
  // }, [aboutData, filterData]);

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
            {aboutData &&
              aboutData?.employees?.map((element) => {
                return <EmployeeCard key={element?._id} {...element} />;
              })}
          </section>
        </div>
      </section>
    </div>
  );
};

export default SearchEmployee;
