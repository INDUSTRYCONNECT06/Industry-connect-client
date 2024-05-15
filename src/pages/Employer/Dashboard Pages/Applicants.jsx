import React, { useState } from "react";
import useFetch from "../../../helpers/useFetch";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import ApplicantDetails from "../../../components/ApplicantDetails";
import { IoIosClose } from "react-icons/io";
import mixpanel from "mixpanel-browser";

const Popup = ({ phone, email, setOpenContactPopup }) => {
  const handleClose = () => {
    mixpanel.track("Close contact popup")
    setOpenContactPopup({ open: false, values: {} });
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#00000036] z-50">
      <div className="bg-white py-10 px-20 rounded-lg flex flex-col items-center gap-6 relative">
      <IoIosClose className="absolute right-3 top-3 cursor-pointer text-2xl" onClick={handleClose}/>
        <h1 className="font-bold text-xl">Contact Details</h1>

        <div className="flex items-start flex-col gap-4 w-full">
          <div className="w-full flex items-center justify-between gap-10">
            <span>
              <strong>Mobile Number</strong> : {phone}
            </span>

            {/* <button className="rounded-lg bg-main-blue-01 text-white px-3 py-1">Call</button> */}
          </div>

          <div className="w-full flex items-center justify-between gap-10">
          <span>
            <strong>Email</strong> : {email}
          </span>
          <button className="rounded-lg bg-main-blue-01 text-white px-3 py-1" onClick={()=>{
             window.open(`mailto:${email}`);
             mixpanel.track("Open email in contact popup")
          }}>Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicantCard = ({
  name,
  profile,
  location,
  educationDetails,
  experienceDetails,
  skills,
  setSelectedApplicant,
  linkedinLink,
  _id,
  setOpenApplicant,
  email,
  mobNumber,
  setOpenContactPopup,
}) => {
  const handleContact = () => {
    mixpanel.track("Open Contact popup", { employee: {name:name,id:_id}})
    setOpenContactPopup({
      open: true,
      values: { phone: mobNumber, email: email },
    });
  };

  return (
    <div className="w-full bg-white box-border p-6 flex items-start gap-6 relative pb-20">
      <img src={profile} alt="employee" className="w-16 h-16 rounded-md" />
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
            <HiOutlineBookOpen /> {educationDetails?.degree},{" "}
            {educationDetails?.field}
          </span>
        </div>

        <section className="flex items-center gap-4 mt-4">
          {skills?.map((e, i) => {
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

      <div className="absolute right-6 bottom-6 flex items-center gap-4">
        <button
          className="bg-white text-main-blue-01 px-14 py-2 hover:scale-105 transition-transform border border-main-blue-01"
          onClick={() => {
            mixpanel.track("View Profile Applicant",{ employee: {name:name,id:_id}})
            setOpenApplicant(true);
            setSelectedApplicant({
              name,
              profile,
              location,
              educationDetails,
              experienceDetails,
              skills,
              _id,
              linkedinLink,
              email,
            });
          }}
        >
          View Profile
        </button>
        <button
          className="bg-white text-main-blue-01 px-14 py-2 hover:scale-105 transition-transform border border-main-blue-01"
          onClick={handleContact}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

const Applicants = () => {
  const { id } = useParams();

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [openApplicant, setOpenApplicant] = useState(false);

  const [openContactPopup, setOpenContactPopup] = useState({
    open: false,
    values: {},
  });

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
      {openContactPopup?.open && (
        <Popup
          {...openContactPopup?.values}
          setOpenContactPopup={setOpenContactPopup}
        />
      )}

      {openApplicant && (
        <ApplicantDetails
          data={selectedApplicant}
          onClose={() => {
            setOpenApplicant(false);
          }}
        />
      )}

      <section className="w-full flex flex-col gap-8">
        {applicantsData && applicantsData?.data?.length > 0 ? (
          applicantsData?.data?.map((element) => {
            return (
              <ApplicantCard
                key={element?._id}
                {...element?.employeeId}
                setSelectedApplicant={setSelectedApplicant}
                setOpenApplicant={setOpenApplicant}
                setOpenContactPopup={setOpenContactPopup}
              />
            );
          })
        ) : (
          <span className="m-auto text-xl font-bold">No applicants</span>
        )}
      </section>
    </>
  );
};

export default Applicants;
