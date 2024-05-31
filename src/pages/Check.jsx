import { useContext, useEffect } from "react";
import loader from "../assets/images/loader.gif";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../Context/LoginState";
import { employerContext } from "../Context/EmployerState";
import { employeeContext } from "../Context/EmployeeState";

function Check() {
  const { googleSuccessLogin } = useContext(loginContext);
  const { loginEmployer } = useContext(employerContext);
  const { loginEmployee } = useContext(employeeContext);

  const navigate = useNavigate();

  useEffect(() => {
    let process = async () => {
      let loginInfo = await googleSuccessLogin();

      //  login in the employer and controliing the navigation
      if (loginInfo?.success) {
        if (localStorage.getItem("userType") === "employer") {
          await loginEmployer(loginInfo?.res);
        } else if (localStorage.getItem("userType") === "employee") {
          await loginEmployee(loginInfo?.res);
        }
      }
    };

    //  check only if the user is not logined
    if (!localStorage.getItem("jwtToken") && localStorage.getItem("userType")) {
      process();
    } else {
      navigate("/");
    }

    return () => {
      if (
        !localStorage.getItem("jwtToken") &&
        localStorage.getItem("userType")
      ) {
        process();
      } else {
        navigate("/");
      }
    };
    
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={loader} alt="Loading..." className="w-20 h-20 mb-24" />
    </div>
  );
}

export default Check;
