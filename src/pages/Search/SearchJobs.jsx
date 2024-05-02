import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiRupee } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import SearchBar from "../../components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../helpers/useFetch";
import { employeeContext } from "../../Context/EmployeeState";
import toast from "react-hot-toast";

export const JobCard = ({
  jobData,
  orgData,
  applied,
  bookmarkedData,
  appliedButton = true,
  bookmarkedButton = true,
  appliedAt = null,
}) => {
  const navigate = useNavigate();

  const { bookMarkJob, applyForJob } = useContext(employeeContext);

  const [bookmarked, setBookmarked] = useState(false);
  const [jobApplied, setJobApplied] = useState(false);

  useEffect(() => {
    setJobApplied(applied);
    setBookmarked(bookmarkedData);
  }, [applied, bookmarkedData]);

  const handleBookmark = async () => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/login");
    } else {
      let json = await bookMarkJob(jobData?._id);

      if (json?.success) {
        if (json?.status === 1) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!jobApplied) {
      if (!localStorage.getItem("jwtToken")) {
        navigate("/login");
      } else {
        let json = await applyForJob(jobData?._id);

        if (json?.success) {
          if (json?.status === 1) {
            toast.success("Successfully applied for the job");
            setJobApplied(true);
          } else if (json?.status === -1) {
            toast.error("Complete your profile first");
            setTimeout(() => {
              navigate("/employee/about");
            }, 1500);
          } else {
            toast.success("Successfully withdrawn the job application");
            setJobApplied(false);
          }
        } else {
          toast.error("Some error occured", {
            position: "top-center",
          });
        }
      }
    }
  };

  return (
    <div className="w-full bg-white box-border p-3 md:p-6 flex items-start gap-3 md:gap-6 relative pb-16 md:pb-20">
      <img
        src={
          orgData?.profile
            ? orgData?.profile
            : jobData?.result
            ? jobData?.result[0]?.profile
            : "https://static.thenounproject.com/png/5572513-200.png"
        }
        alt="employee"
        className="w-8 h-8 md:w-14 md:h-14 rounded-md"
      />
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h5 className="text-xs md:text-sm text-[#141414] font-normal">
            {orgData?.name}
          </h5>
          <h3 className="text-sm md:text-xl text-[#141414] font-semibold w-2/3 md:w-3/4 leading-4">
            {jobData?.title}
          </h3>
        </div>

        <div className="flex gap-x-4 gap-y-2 md:gap-12 text-[#141414b2] text-xs md:text-sm mt-1 flex-wrap">
          <span className="flex items-center gap-2">
            <CiLocationOn size={18} />
            {jobData?.location}
          </span>
          <span className="flex items-center gap-2">
            <AiOutlineClockCircle size={18} />
            {jobData?.jobType}
          </span>
          <span className="flex items-center gap-2">
            <BiRupee size={18} />
            {jobData?.salary}
          </span>
          <span className="flex items-center gap-2">
            <SlCalender size={18} />
            {moment(jobData?.createdAt).fromNow()}
          </span>
        </div>

        {jobData?.description && (
          <p className="text-xs md:text-sm text-[#141414] font-normal mt-3 md:mt-2">
            {jobData?.description}
          </p>
        )}

        <section className="flex items-center flex-wrap gap-2 md:gap-4 mt-4 text-xs md:text-sm">
          {jobData?.skillsArr?.map((e, i) => {
            return (
              <span
                key={i}
                className="bg-[#000aff8a] text-white px-3 py-1 rounded-md"
              >
                {e}
              </span>
            );
          })}
        </section>
      </section>

      {bookmarkedButton &&
        (bookmarked ? (
          <BsFillBookmarkFill
            size={20}
            color="#000AFF"
            className="absolute right-6 top-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={handleBookmark}
          />
        ) : (
          <BsBookmark
            size={20}
            color="#000AFF"
            className="absolute right-6 top-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={handleBookmark}
          />
        ))}

      <div className="absolute w-full left-0 flex items-center justify-center md:left-auto md:w-max md:right-6 bottom-3">
        {appliedButton && (
          <button
            className={`${
              jobApplied ? "bg-green-800" : "bg-main-blue-01"
            } text-white text-sm md:text-[16px] rounded-lg px-14 py-2 hover:scale-105 transition-transform w-52`}
            onClick={handleSubmit}
          >
            {jobApplied ? "Applied" : "Apply Now"}
          </button>
        )}

        {appliedAt && (
          <p className="text-xs absolute right-2 w-max">
            Applied at: <strong>{new Date(appliedAt).toDateString()}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

const SearchJobs = () => {
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
    }/api/search/jobs?position=${position}&location=${location}&noLogin=${
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

  // handling the filter and again showing the data ---------------
  useEffect(() => {
    const employmentFilter = (job) => {
      if (filterData?.employment) {
        return job?.jobData?.jobType?.includes(filterData?.employment);
      }
      return true; // No filter applied
    };

    const salaryFilter = (job) => {
      if (filterData?.salary) {
        return parseInt(job?.jobData?.salary) > parseInt(filterData?.salary);
      }
      return true; // No filter applied
    };

    const expFilter = (job) => {
      if (filterData?.exp) {
        return parseInt(job?.jobData?.experience) < parseInt(filterData?.exp);
      }
      return true;
    };

    // Apply the filters to the data
    const filteredData = aboutData?.jobs?.filter((job) => {
      return employmentFilter(job) && salaryFilter(job) && expFilter(job);
    });

    setFinalData(filteredData);
  }, [aboutData, filterData]);

  // prevneting the employer to access this -------------------
  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") &&
      localStorage.getItem("userType") !== "employee"
    ) {
      navigate("/search/employees");
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 md:gap-8 items-center justify-center mt-6 md:mt-10">
      <h1 className="text-2xl md:text-4xl font-bold uppercase">
        SEARCH <span className="text-main-blue-01">JOBS</span>
      </h1>
      <span className="text-sm md:text-xl mb-6 text-center">
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </span>
      <SearchBar position={position} location={location} />

      <section className="w-[95vw] md:w-[85vw] p-2 md:p-10 bg-[#FAFAFA] my-10 flex items-start justify-between h-max">
        {/* Filters section ------------------ */}
        {window.screen.width > 600 && (
          <div className="bg-white w-[250px] p-6 box-border flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Filters</h2>
              <span
                className="text-main-blue-01 text-sm cursor-pointer flex items-center gap-2"
                onClick={() => {
                  setFilterData({ employment: null, salary: null, exp: null });
                }}
              >
                {" "}
                Reset
              </span>
            </div>
            <section className="flex flex-col gap-4">
              <h3 className="text-[16px] font-medium">Type of employment</h3>

              <div className="pl-1 flex flex-col gap-2">
                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="employment"
                    id="Full Time"
                    onChange={handleChange}
                  />
                  <label htmlFor="Full Time">Full Time</label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="employment"
                    id="Part Time"
                    onChange={handleChange}
                  />
                  <label htmlFor="Part Time">Part Time</label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="employment"
                    id="Internship"
                    onChange={handleChange}
                  />
                  <label htmlFor="Internship">Internship</label>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-[16px] font-medium">Salary (per year)</h3>

              <div className="pl-1 flex flex-col gap-2">
                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="salary"
                    id="30000k"
                    onChange={handleChange}
                  />
                  <label htmlFor="30000k"> &gt; 30000k </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="salary"
                    id="60000k"
                    onChange={handleChange}
                  />
                  <label htmlFor="60000k"> &gt; 60000k </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="salary"
                    id="90000k"
                    onChange={handleChange}
                  />
                  <label htmlFor="90000k"> &gt; 90000k </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="salary"
                    id="130000k"
                    onChange={handleChange}
                  />
                  <label htmlFor="130000k"> &gt; 130000k </label>
                </div>
              </div>
            </section>

            {/* <section className="flex flex-col gap-4">
              <h3 className="text-[16px] font-medium">
                Experience requirement (in years)
              </h3>

              <div className="pl-1 flex flex-col gap-2">
                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="exp"
                    id="1"
                    onChange={handleChange}
                  />
                  <label htmlFor="1"> &lt; 1 year </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="exp"
                    id="2"
                    onChange={handleChange}
                  />
                  <label htmlFor="2"> &lt; 2 years </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="exp"
                    id="3"
                    onChange={handleChange}
                  />
                  <label htmlFor="3"> &lt; 3 years </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="exp"
                    id="4"
                    onChange={handleChange}
                  />
                  <label htmlFor="4"> &lt; 4 years </label>
                </div>

                <div className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="exp"
                    id="5"
                    onChange={handleChange}
                  />
                  <label htmlFor="5"> &lt; 5 years </label>
                </div>
              </div>
            </section> */}
          </div>
        )}

        {/* Employee list */}
        <div className="w-full md:w-3/4 md:p-6">
          <div className="mb-6">
            <span className="text-xl md:text-3xl font-semibold">
              {finalData?.length} Jobs
            </span>
          </div>

          <section className="w-full flex flex-col gap-8">
            {finalData &&
              finalData?.map((element) => {
                return <JobCard key={element?._id} {...element} />;
              })}
          </section>
        </div>
      </section>
    </div>
  );
};

export default SearchJobs;
