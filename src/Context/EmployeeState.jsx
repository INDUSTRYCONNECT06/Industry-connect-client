import { createContext } from "react";
import toast from "react-hot-toast";
import mixpanel from "mixpanel-browser";

export const employeeContext = createContext();

const EmployeeState = (props) => {
  // 1. login the employee and generate token ---------------
  const loginEmployee = async (loginInfo) => {
    let res = await fetch(`${import.meta.env.VITE_HOST}/api/employee/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(loginInfo),
    });

    let result = await res.json();
    if (result?.success) {
      mixpanel.identify(loginInfo?.email);
      mixpanel.people.set_once({
        $first_name: loginInfo?.name?.split(" ")[0],
        $last_name: loginInfo?.name?.split(" ")[1],
        $email: loginInfo?.email,
        userType: "Employer",
      });
      localStorage.setItem("jwtToken", result?.jwtToken);
      if (result?.firstTime) {
        window.open("/employee/about", "_self");
      } else {
        window.open("/", "_self");
      }
    } else {
      toast.error("Some error occured in logging, Please Try Again!!!");
      window.open("/login", "_self");
    }
  };

  // 2. bookmark the jb for later ---------------
  const bookMarkJob = async (jobId) => {
    let res = await fetch(
      `${import.meta.env.VITE_HOST}/api/employee/bookmarkJob`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          jwtToken: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({ jobId }),
      }
    );

    let result = await res.json();

    return result;
  };

  // 3. bookmark the jb for later ---------------
  const applyForJob = async (jobId) => {
    let res = await fetch(
      `${import.meta.env.VITE_HOST}/api/employee/applyForJob`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          jwtToken: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({ jobId }),
      }
    );

    let result = await res.json();
    return result;
  };

  // 4. Update the about route ---------------
  const updateAbout = async (data) => {
    let result = await fetch(
      `${import.meta.env.VITE_HOST}/api/employee/updateAbout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          jwtToken: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify(data),
      }
    );

    const json = await result.json();
    return json;
  };

  return (
    <employeeContext.Provider
      value={{ loginEmployee, bookMarkJob, applyForJob, updateAbout }}
    >
      {props?.children}
    </employeeContext.Provider>
  );
};

export default EmployeeState;
