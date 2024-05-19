
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { citiesData, jobsData } from "../assets/data/sample";
import { useNavigate } from "react-router-dom";

const SearchBar = ({position,location}) => {

  const navigate = useNavigate()

  const [data, setData] = useState({ position: "", location: "" });
  const [CloseModal, setCloseModal] = useState({
    position: true,
    location: true,
  });

  const handleChange = (e) => {
    setCloseModal({ ...CloseModal, [e.target.name]: true });
    setData({ ...data, [e.target.name]: e.target.value });

    if(!e.target.value){
      setCloseModal({ ...CloseModal, [e.target.name]: false });
    }
  };

  const onSubmit = (e) => {
    e?.preventDefault();

    if(localStorage.getItem("userType") === "employer" || window.location.pathname === "/search/employees"){
      navigate(
        `/search/employees?position=${data?.position}&location=${data?.location}`
      ) 
    }

    else if(localStorage.getItem("userType") === "employee" || window.location.pathname === "/search/jobs"){
      navigate(
        `/search/jobs?position=${data?.position}&location=${data?.location}`
      ) 
    }
 
  };

  useEffect(() => {
    if(position && position !== "null"){
      setData({...data,position:position})
    }

    if(location && location !== "null"){
      setData({...data,location:location})
    }

    setCloseModal({
      position: false,
      location: false,
    })
  }, [position,location])
  

  return (
    <form
      className="w-[90%] md:w-2/3 h-[50px] md:h-[73px] px-2 md:px-10 rounded-xl relative grid grid-cols-1 md:grid-cols-2 shadow-lg"
      onSubmit={onSubmit}
    >
      <section className="flex items-center gap-2 md:gap-4 w-full md:w-5/6">
        <AiOutlineSearch size={25} />

        <div className="flex w-full flex-col relative text-xs md:text-sm" onClick={(e)=>{e?.stopPropagation()}}>
          <input
            type="text"
            placeholder="What position are you looking for ?"
            className="w-full focus:outline-none"
            name="position"
            value={data?.position}
            onChange={handleChange}
            autoComplete="off"
          />
          {CloseModal?.position && (
            <div className="flex flex-col absolute top-10 md:top-[50px] bg-[#f7f7f7] gap-2 w-max md:w-full shadow-md box-border z-40">
              {jobsData
                ?.filter((e, i) => {
                  return e
                    ?.toLowerCase()
                    .startsWith(data?.position?.toLowerCase());
                })?.slice(0,6)
                ?.map((e, i) => {
                  return (
                    <span
                      key={i}
                      className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                      onClick={() => {
                        setData({ ...data, position: e });
                        setCloseModal({ ...CloseModal, position: false });
                      }}
                    >
                      {e}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
      </section>
      {window.screen.width > 600 && <section className="flex items-center gap-4 w-1/2">
        <CiLocationOn size={25} />

        <div className="flex w-full flex-col relative" onClick={(e)=>{e?.stopPropagation()}}>
          <input
            type="text"
            placeholder="Location"
            className="w-full focus:outline-none"
            autoComplete="off"
            name="location"
            value={data?.location}
            onChange={handleChange}
          />
          {CloseModal?.location && (
            <div className="flex flex-col absolute top-[50px] bg-white gap-2 w-max shadow-md box-border z-40">
              {citiesData
                ?.filter((e, i) => {
                  return e
                    ?.toLowerCase()
                    .startsWith(data?.location?.toLowerCase());
                })?.slice(0,6)
                ?.map((e, i) => {
                  return (
                    <span
                      key={i}
                      className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                      onClick={() => {
                        setData({ ...data, location: e });
                        setCloseModal({ ...CloseModal, location: false });
                      }}
                    >
                      {e}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
      </section>}

      <button
        type="submit"
        className="w-20 md:w-[116px] h-[50px] md:h-[73px]  bg-main-blue-01 text-white absolute right-0 text-xs md:text-sm"
      >
        Apply now
      </button>
    </form>
  );
};

export default SearchBar;
