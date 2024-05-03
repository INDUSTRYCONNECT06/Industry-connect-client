import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import SearchEmployee from "./pages/Search/SearchEmployee";
import SearchJobs from "./pages/Search/SearchJobs";
import Check from "./pages/Check";
import { Toaster } from "react-hot-toast";
import EmployerState from "./Context/EmployerState";
import Employer from "./RouteControllers/Employer";
import PreventNumberInputScrolling from "./helpers/preventDefaultScroliing";
import { loginContext } from "./Context/LoginState";
import { useContext, useEffect } from "react";
import EmployeeState from "./Context/EmployeeState";
import Employee from "./RouteControllers/Employee";
import MobileNav from "./components/MobileNav";

export default function App() {
  const { checkAndVerifyLoginUser } = useContext(loginContext);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      checkAndVerifyLoginUser();
    }
  }, []);

  return (
    <>
      {/* prevent input number default mobuse scrolling changes ----------- */}
      <PreventNumberInputScrolling />
        <EmployerState>
          <EmployeeState>
            <Navbar />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search/jobs" element={<SearchJobs />} />
              <Route path="/search/employees" element={<SearchEmployee />} />

              {/* Route Conrollers -------------- */}
              <Route path="/check" element={<Check />} />
              <Route path="/employer/*" element={<Employer />} />
              <Route path="/employee/*" element={<Employee />} />
            </Routes>

            {/* <Footer /> */}
            {["/search/jobs","/employee/about","/employee/saved","/employee/applied"].includes(location.pathname) &&
            window.screen.width < 600 &&
            localStorage.getItem("jwtToken") ? (
              <>
              <div className="py-8 w-full"></div>
              <MobileNav />
              </>
            ) : (
              <Footer />
            )}
          </EmployeeState>
        </EmployerState>
      <Toaster position="top-center" gutter={10} />
    </>
  );
}
