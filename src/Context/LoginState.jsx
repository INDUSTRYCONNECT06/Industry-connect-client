import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const loginContext = createContext();

const LoginState = (props) => {
  const [loginUserInfo, setLoginUserInfo] = useState(null);


  // 1. get google success login data after redirection  -----------
  const googleSuccessLogin = async () => {
   
    let response = await fetch(
      `${import.meta.env.VITE_HOST}/google/login/success`,
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

    if (json?.success) {
      return json?.res

    }
    else{
      toast.error("Some error occured while logging in, Please try again !!!",{
        position:'top-center',
        duration:3000
      });
    }

  };


  // 2. Check/verify  and fetch user login details route ---------------
  const checkAndVerifyLoginUser = async () => {
    let result = await fetch(
      `${
        import.meta.env.VITE_HOST
      }/google/checkAndFetchLoginData?userType=${localStorage.getItem(
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
        `${import.meta.env.VITE_HOST}/google/logout`,
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
