import { createContext } from "react";
import toast from "react-hot-toast";
import mixpanel from "mixpanel-browser";

export const employerContext = createContext();

const EmployerState = (props) => {
  // 1. login the employer and generate token ---------------
  const loginEmployer = async (loginInfo) => {
    let res = await fetch(`${import.meta.env.VITE_HOST}/api/employer/login`, {
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
      window.open("/employer/about", "_self");
    } else {
      toast.error("Some error occured in logging, Please Try Again!!!");
    }
  };

  // 2. Update the about route ---------------
  const updateAbout = async (data) => {
    let result = await fetch(
      `${import.meta.env.VITE_HOST}/api/employer/updateAbout`,
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

  // 3. create a job route ---------------
  const createJob = async (data) => {
    let result = await fetch(
      `${import.meta.env.VITE_HOST}/api/employer/postJob`,
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
    <employerContext.Provider value={{ updateAbout, createJob, loginEmployer }}>
      {props.children}
    </employerContext.Provider>
  );
};

export default EmployerState;
