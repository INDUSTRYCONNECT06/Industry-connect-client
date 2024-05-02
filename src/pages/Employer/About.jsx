import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../helpers/useFetch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { employerContext } from "../../Context/EmployerState";
import { citiesData } from "../../assets/data/sample";

const About = () => {
  const navigate = useNavigate();
  const [CloseModal, setCloseModal] = useState(false);
  const { updateAbout } = useContext(employerContext);
  const [data, setData] = useState({
    name: "",
    location: "",
    mobNumber: null,
    websiteLink: "",
    description: "",
    industryDomain: null,
  });

//   fetching the data stord in about
  let { data: aboutData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employer/getAbout`,
    "get",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        jwtToken: localStorage.getItem("jwtToken"),
      },
    }
  );

  useEffect(() => {
    setData({ ...aboutData?.form });
  }, [aboutData]);


  // submitting the form
  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await updateAbout(data);

    if (json?.success) {
      toast.success("Details Submitted successfully", {
        position: "top-center",
        duration: 2500,
      });

    // newly logined user would go to post job -------
      if (json?.firstTime) {
        navigate("/employer/postajob");
      } else {
        navigate("/employer/dashboard");
      }
    }
  };

  // handleing the change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "location") {
      setCloseModal(true);
      if (e.target.value === "") {
        setCloseModal(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full my-16">
        <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
          <h1 className="text-xl font-semibold">About Company</h1>

          <form
            className="flex flex-col w-[454px] items-center gap-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Company Name"
              name="name"
              id="name"
              value={data?.name}
              onChange={handleChange}
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
              required
            />
            <select
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-1 py-2"
              id="industryDomain"
              name="industryDomain"
              onChange={handleChange}
              required
              value={data?.industryDomain}
              autoComplete="on"
            >
              <option value="" disabled selected className="text-[grey]">
                Select Industry Domain
              </option>
              <option value="Telecom">Telecom</option>
              <option value="Software">Software</option>
              <option value="Automobile">Automobile</option>
              <option value="Agriculture">Agriculture</option>
            </select>
            <input
              placeholder="Mobile Number"
              name="mobNumber"
              id="mobNumber"
              type="number"
              value={data?.mobNumber}
              onChange={handleChange}
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4"
              required
              minLength={10}
              maxLength={10}
            />

            <div className="w-full relative">
              <input
                type="text"
                placeholder="Location"
                name="location"
                id="location"
                value={data?.location}
                onChange={handleChange}
                className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
                required
                autoComplete="off"
              />
              {CloseModal && (
                <div className="flex flex-col absolute top-[55px] bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50">
                  {citiesData
                    ?.filter((e, i) => {
                      return e
                        ?.toLowerCase()
                        .startsWith(data?.location?.toLowerCase());
                    })
                    ?.slice(0, 6)
                    ?.map((e, i) => {
                      return (
                        <span
                          key={i}
                          className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                          onClick={() => {
                            setData({ ...data, location: e });
                            setCloseModal(false);
                          }}
                        >
                          {e}
                        </span>
                      );
                    })}
                </div>
              )}
            </div>
            <input
              placeholder="Website Link"
              name="websiteLink"
              id="websiteLink"
              type="url"
              value={data?.websiteLink}
              onChange={handleChange}
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="20"
              onChange={handleChange}
              value={data?.description}
              placeholder="Description"
              className="w-full border border-[#5858581F] rounded-lg h-[151px] px-4 py-2 resize-none"
            />

            <button
              type="submit"
              className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
