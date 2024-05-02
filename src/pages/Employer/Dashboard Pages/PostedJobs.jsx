import React from 'react'
import useFetch from '../../../helpers/useFetch';
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const JobCard = ({
    title,
    skillsArr,
    totalVacancy,
    location,
    salary,
    experience,
    updatedAt = Date.now(),
    _id
  }) => {
    const navigate = useNavigate()

    return (
      <div className="w-full bg-white box-border p-6 flex items-start gap-6 relative pb-6 overflow-hidden">
        <section className="flex flex-col gap-1">
          <h3 className="text-xl text-[#141414] font-semibold ">{title} <h5 className="inline text-gray-500 text-sm">({totalVacancy})</h5></h3>
  
          <div className="text-[#141414b2] text-sm my-3 grid grid-cols-2 gap-5">
            <span className="flex items-center gap-1">
              <CiLocationOn size={18} /> {location}
            </span>
            {/* <span className="flex items-center gap-1">
              <HiOutlineBookOpen /> {educationDetails?.degree}, {educationDetails?.field}
            </span> */}
            <span className="flex items-center gap-1"> <BiRupee size={18} /> {salary}</span>
            <span className="flex items-center gap-1"><AiOutlineClockCircle size={18} /> {experience} years</span>
            <span className="flex items-center gap-1"><SlCalender size={18} /> {moment(updatedAt).fromNow()}</span>
          </div>
  
          <section className="flex items-center gap-4 mt-4">
            {skillsArr?.map((e, i) => {
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
  
        <div className="absolute right-6 top-6">
            <span className="text-[#1400FF] text-[16px] underline cursor-pointer" onClick={()=>{navigate(`/employer/dashboard/applicants/${_id}`)}}>View Applicants</span>
        </div>
      </div>
    );
  };
  

const PostedJobs = () => {

      //   fetching the data stord in about
  let { data: jobsData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employer/getAllJobs`,
    "get",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        jwtToken: localStorage.getItem("jwtToken"),
      },
    }
  );

  return (
    <section className="w-full flex flex-col gap-8">
    {jobsData &&
      jobsData?.data?.length > 0 ?
      jobsData?.data?.map((element) => {
        return <JobCard key={element?._id} {...element} />;
      })
    :
    <span className="m-auto text-xl font-bold">No Jobs Posted</span>
    }
  </section>
  )
}

export default PostedJobs