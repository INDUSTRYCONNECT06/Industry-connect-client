import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../pages/Employee/About";
import AppliedJobs from "../pages/Employee/AppliedJobs";
import SavedJobs from "../pages/Employee/SavedJobs";

const Employee = () => {
  const navigate = useNavigate();

  //   blocking the passage
  useEffect(() => {
    let process = () => {
      if (
        !localStorage.getItem("jwtToken") ||
        localStorage.getItem("userType") !== "employee"
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
      <Route path="applied" element={<AppliedJobs />} />
      <Route path="saved" element={<SavedJobs />} />
    </Routes>
  );
};

export default Employee;
