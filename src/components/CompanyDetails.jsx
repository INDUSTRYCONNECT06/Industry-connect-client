import React from "react";
import { MdClose } from "react-icons/md";
import { IoIosLink } from "react-icons/io";

const CompanyDetails = ({data,profile,onClose}) => {
    console.log(data?.form)
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-20 bg-[#48464636]">
      <div className="bg-[#FAFAFA] px-16 py-12 w-2/3 box-border shadow-lg">
        <section className="w-full max-h-[70vh] overflow-auto bg-white px-16 py-12 box-border flex gap-10 flex-col items-start relative">

        <h1 className="text-xl font-medium text-gray-500 mx-auto underline">Company Profile</h1>
        <MdClose size={20} color="grey" className="absolute right-16 top-12 cursor-pointer hover:scale-125 transition-transform" onClick={onClose}/>

          <div className="flex items-start gap-6">
            <img
              src={profile}
              alt=""
              className="w-40 h-40 shadow-sm"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
              }}
            />

            <div className="flex flex-col gap-2 items-start text-center mt-6">
              <h2 className="text-xl font-bold">{data?.form?.name}</h2>
              <span className="text-[14px]">{data?.form?.location}</span>

              {data?.form?.websiteLink && <section className="flex items-center mt-6 gap-2 inline" onClick={()=>{window.open(data?.form?.websiteLink)}}>
              <IoIosLink size={20} color="grey" className="cursor-pointer"/>
              <span className="text-sm text-gray-500 underline cursor-pointer">{data?.form?.websiteLink}</span>
              </section>}
            </div>
          </div>


          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-medium">About Me</h4>
            <p>{data?.form?.description}</p>
          </div>


          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-medium">Industry</h4>
            <p>{data?.form?.industryDomain}</p>
          </div>

        </section>
      </div>
    </div>
  );
};

export default CompanyDetails;
