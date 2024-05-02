import React, { useState } from "react";
import useFetch from "../../../helpers/useFetch";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import ApplicantDetails from "../../../components/ApplicantDetails";

const ApplicantCard = ({name,profile,location,educationDetails,experienceDetails,skills,setSelectedApplicant,linkedinLink,_id,setOpenApplicant,email}) => {
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

      <div className="absolute right-6 bottom-6 flex items-center gap-4">
        <button className="bg-white text-main-blue-01 px-14 py-2 hover:scale-105 transition-transform border border-main-blue-01" onClick={()=>{setOpenApplicant(true);setSelectedApplicant({name,profile,location,educationDetails,experienceDetails,skills,_id,linkedinLink,email})}}>
          View Profile
        </button>
        <button className="bg-white text-main-blue-01 px-14 py-2 hover:scale-105 transition-transform border border-main-blue-01">
          Contact
        </button>
      </div>
    </div>
  );
};

const Applicants = () => {
  const { id } = useParams();

  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [openApplicant, setOpenApplicant] = useState(false)

  //   fetching the data stord in about
  let { data: applicantsData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employer/getAllApplicants/${id}`,
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

    <>

    {openApplicant && <ApplicantDetails data={selectedApplicant} onClose={()=>{setOpenApplicant(false)}}/>}

    <section className="w-full flex flex-col gap-8">
    {applicantsData &&
    applicantsData?.data?.length > 0 ?
      applicantsData?.data?.map((element) => {
        return <ApplicantCard key={element?._id} {...element?.employeeId} setSelectedApplicant={setSelectedApplicant} setOpenApplicant={setOpenApplicant}/>;
      })
    : 
    <span className="m-auto text-xl font-bold">No applicants</span>
    }
  </section>

  </>
  );
};

export default Applicants;
