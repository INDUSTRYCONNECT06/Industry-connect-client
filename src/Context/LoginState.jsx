import { createContext, useState } from "react";
import toast from "react-hot-toast";
import mixpanel from "mixpanel-browser";

export const loginContext = createContext();

const LoginState = (props) => {
  const [loginUserInfo, setLoginUserInfo] = useState(null);


  // 1. get google success login data after redirection  -----------
  const googleSuccessLogin = async () => {
   
    let response = await fetch(
      `${import.meta.env.VITE_HOST}/api/google/login/success`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    let json = await response.json();
    return json;

  };


  // 2. Check/verify  and fetch user login details route ---------------
  const checkAndVerifyLoginUser = async () => {
    let result = await fetch(
      `${import.meta.env.VITE_HOST}/api/google/checkAndFetchLoginData?userType=${localStorage.getItem(
        "userType"
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          jwtToken: localStorage.getItem("jwtToken"),
        }
      }
    );

    const json = await result.json();

    if(json?.success){
        setLoginUserInfo(json?.user)
    }

    else{
        toast.error("Some error occured in authentication. Please Login again !!!",{
            position:'top-center',
            duration:3000
        })
        LogoutUser()
    }

  };


//   logout the user
  const LogoutUser = async () =>{
    await fetch(
        `${import.meta.env.VITE_HOST}/api/google/logout`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userType");
      mixpanel.reset()
      toast.success("Logged Out Successfully",{
        position:"top-center",
        duration:1500
      })

      setTimeout(() => {
        window.location.reload()
      }, 1000);

  }


  return (
    <loginContext.Provider value={{ checkAndVerifyLoginUser,loginUserInfo,LogoutUser,googleSuccessLogin }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
