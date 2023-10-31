import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../pages/Employee/About";

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
    </Routes>
  );
};

export default Employee;
