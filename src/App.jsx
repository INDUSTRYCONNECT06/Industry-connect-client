import { BrowserRouter, Route, Routes } from "react-router-dom";
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

export default function App() {
  const { checkAndVerifyLoginUser } = useContext(loginContext);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      checkAndVerifyLoginUser();
    }
  }, []);

  return (
    <>
      {/* prevent input number default mobuse scrolling changes ----------- */}
      <PreventNumberInputScrolling />

      <BrowserRouter>
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
            </Routes>

            <Footer />
          </EmployeeState>
        </EmployerState>
      </BrowserRouter>
      <Toaster position="top-center" gutter={10}/>
    </>
  );
}
