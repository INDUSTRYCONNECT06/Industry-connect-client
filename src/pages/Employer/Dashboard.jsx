import React, { useContext, useState } from "react";
import useFetch from "../../helpers/useFetch";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PostedJobs from "./Dashboard Pages/PostedJobs";
import Applicants from "./Dashboard Pages/Applicants";
import { loginContext } from "../../Context/LoginState";
import CompanyDetails from "../../components/CompanyDetails";

const Dashboard = () => {

  const location = useLocation()

  const navigate = useNavigate()
  const { loginUserInfo } = useContext(loginContext);

  const [openCompanyModal, setOpenCompanyModal] = useState(false)

  //   fetching the data stord in about
  let { data: aboutData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employer/getAbout`,
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

    {openCompanyModal && <CompanyDetails data={aboutData} profile={loginUserInfo?.profile} onClose={()=>{setOpenCompanyModal(false)}}/>}

    <div className="flex flex-col gap-8 items-center justify-center mt-10">
      <h1 className="text-2xl font-medium">{location.pathname.includes("/employer/dashboard/applicants") ? "Applicants" : "Posted Jobs"}</h1>

      <section className="w-[85vw] p-10 gap-10 bg-[#FAFAFA] my-10 flex items-start justify-between h-max">
        {/* Filters section ------------------ */}
        <div className="bg-white w-[250px] p-6 box-border min-w-[250px]">
          <section className="flex items-center flex-col gap-3 cursor-pointer" onClick={()=>{setOpenCompanyModal(true)}}>
            <img src={loginUserInfo?.profile} className="w-20 h-20" alt="" onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
        }}/>

            <div className="flex flex-col gap-1 items-center text-center">
              <h2 className="text-lg font-semibold">{aboutData?.form?.name}</h2>
              <span className="text-[14px]">{aboutData?.form?.location}</span>
            </div>
          </section>



          <section className="w-[100%] mt-10 flex flex-col gap-4 items-center text-center text-[15px]">
            <div className=" w-full py-2 bg-[#D9D9D959] hover:bg-[#D9D9D959] cursor-pointer rounded-sm" onClick={()=>{navigate("/employer/dashboard")}}>Posted Jobs</div>
            <div className=" w-full py-2 bg-[#f0f0f064] hover:bg-[#D9D9D959] cursor-pointer rounded-sm" onClick={()=>{navigate("/employer/postjob")}}>Post Job</div>
            <div className=" w-full py-2 bg-[#f0f0f064] hover:bg-[#D9D9D959] cursor-pointer rounded-sm" onClick={()=>{navigate("/employer/about")}}>Edit Profile</div>
            <div className=" w-full py-2 bg-[#f0f0f064] hover:bg-[#D9D9D959] cursor-pointer rounded-sm" onClick={()=>{navigate("/")}}>Search Employees</div>
          </section>
        </div>


        <div className="w-full"> 
          <Routes>
            <Route path="*" element={<PostedJobs/>}/>
            <Route path="/applicants/:id" element={<Applicants/>}/>
          </Routes>
        </div>
      </section>
    </div>

    </>
  );
};

export default Dashboard;
