import React from "react";
import { MdClose } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import moment from "moment";
import { IoMdMail } from "react-icons/io";

const ApplicantDetails = ({ data, onClose }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-20 bg-[#48464636]">
      <div className="bg-[#FAFAFA] px-16 py-12 w-2/3 box-border shadow-lg">
        <section className="w-full max-h-[70vh] overflow-auto bg-white px-16 py-12 box-border flex gap-10 flex-col items-start relative">
          <h1 className="text-xl font-medium text-gray-500 mx-auto underline">
            Applicant Details
          </h1>
          <MdClose
            size={20}
            color="grey"
            className="absolute right-16 top-12 cursor-pointer hover:scale-125 transition-transform"
            onClick={onClose}
          />

          <div className="flex items-start gap-6">
            <img src={data?.profile} alt="" className="w-40 h-40 shadow-sm" onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
        }}/>

            <div className="flex flex-col gap-2 items-start text-center mt-6">
              <h2 className="text-xl font-bold">{data?.name}</h2>
              <span className="text-[14px]">{data?.location}</span>

              <section className="flex items-center mt-6 gap-3 inline">
                {data?.linkedinLink && (
                  <FaLinkedin
                    size={20}
                    color="grey"
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(data?.linkedinLink);
                    }}
                  />
                )}
                {data?.email && (
                  <IoMdMail
                    size={20}
                    color="grey"
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(`mailto:${data?.email}`);
                    }}
                  />
                )}
              </section>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-medium">Education</h4>
            <div className="flex flex-col gap-1 text-sm">
              <span>
                {data?.educationDetails?.degree} (
                {data?.educationDetails?.field}) | (
                {data?.educationDetails?.completion})
              </span>
              <span>{data?.educationDetails?.college}</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-medium">Skills</h4>
            <section className="flex items-center gap-4 mt-4">
              {data?.skills?.map((e, i) => {
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
          </div>

          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-medium">Experience</h4>
            {data?.experienceDetails?.map((e) => {
              return (
                <div className="flex flex-col gap-1 text-sm" key={e?._id}>
                  <span>
                    {e?.jobRole} | ({e?.company})
                  </span>
                  <span>
                    {moment().format("MMM YY")} - {moment().format("MMM YY")}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicantDetails;
