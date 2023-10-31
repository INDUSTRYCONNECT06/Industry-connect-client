import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../pages/Employer/About";
import PostJob from "../pages/Employer/PostJob";
import Dashboard from "../pages/Employer/Dashboard";

const Employer = () => {
  const navigate = useNavigate();

  //   blocking the passage
  useEffect(() => {
    let process = () => {
      if (
        !localStorage.getItem("jwtToken") ||
        localStorage.getItem("userType") !== "employer"
      ) {
        navigate("/");
        return null;
      }
    };

    process();
  }, []);
  

  return (
    <Routes>
      <Route path="about" element={<About />} />
      <Route path="postjob" element={<PostJob />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Employer;
