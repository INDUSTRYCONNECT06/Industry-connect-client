import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../helpers/useFetch";
import toast from "react-hot-toast";
import { employeeContext } from "../../Context/EmployeeState";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import {
  citiesData,
  jobTypes,
  jobsData,
  skillsData,
} from "../../assets/data/sample";
import { MdCancel } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiAchievement } from "react-icons/gi";
import { TbFileAnalytics } from "react-icons/tb";

const AboutForm = ({ setDisplayForm, dbData, updateAbout }) => {
  const [CloseModal, setCloseModal] = useState(false);
  const [data, setData] = useState({
    originalName: "",
    location: "",
    mobNumber: null,
    linkedinLink: "",
    email: "",
  });

  useEffect(() => {
    setData({ ...dbData });
  }, [dbData]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await updateAbout(data);

    if (json?.success) {
      toast.success("Details Submitted successfully", {
        position: "top-center",
        duration: 2500,
      });
      setDisplayForm();
    }
  };

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
    <div className="flex items-center justify-center w-full my-8 md:my-16 px-4 box-border">
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center border border-[#E6E6E6] w-full md:w-auto px-8 md:px-[52px] py-[47px] shadow-black rounded-md box-border">
        <h1 className="text-lg md:text-xl font-semibold">About Me</h1>

        <form
          className="flex flex-col w-full md:w-[454px] items-center gap-6 text-sm md:text-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your  Name"
            name="originalName"
            id="originalName"
            value={data?.originalName ?? data?.name}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />
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
            placeholder="Linkedin id"
            name="linkedinLink"
            id="linkedinLink"
            type="url"
            value={data?.linkedinLink}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
          />
          <input
            placeholder="Email id"
            name="email"
            id="email"
            type="email"
            disabled
            value={data?.email}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-[242px] bg-main-blue-01 rounded-lg py-2 md:py-3 text-sm md:text-xl text-white hover:scale-105 transition-transform"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

const EducationForm = ({ setDisplayForm, dbData, updateAbout }) => {
  const [data, setData] = useState({
    college: "",
    degree: "",
    field: "",
    completion: "",
    educationType: "",
  });

  useEffect(() => {
    setData({ ...dbData });
  }, [dbData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await updateAbout({
      educationDetails: data,
    });

    if (json?.success) {
      toast.success("Details Submitted successfully", {
        position: "top-center",
        duration: 2500,
      });
      setDisplayForm();
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-8 md:my-16 px-4 box-border">
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center border border-[#E6E6E6] w-full md:w-auto px-8 md:px-[52px] py-[47px] shadow-black rounded-md box-border">
        <h1 className="text-lg md:text-xl font-semibold">Education</h1>

        <form
          className="flex flex-col w-full md:w-[454px] items-center gap-6 text-sm md:text-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="College Name"
            name="college"
            id="college"
            value={data?.college}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />
          <input
            placeholder="Degree"
            name="degree"
            id="degree"
            value={data?.degree}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4"
            required
          />
          <input
            type="text"
            placeholder="Field of Study / Branch"
            name="field"
            id="field"
            value={data?.field}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />
          <input
            placeholder="Completion Year"
            name="completion"
            id="completion"
            type="number"
            value={data?.completion}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />
          <select
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-1 py-2"
            id="education"
            name="education"
            onChange={handleChange}
            required
            value={data?.education}
            autoComplete="on"
          >
            <option value="" disabled selected className="text-[#adadad]">
              Select Education Type
            </option>
            <option value="Regular">Regular</option>
            <option value="Distance">Distance</option>
          </select>

          <button
            type="submit"
            className="w-[242px] bg-main-blue-01 rounded-lg py-2 md:py-3 text-sm md:text-xl text-white hover:scale-105 transition-transform"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

const ExperienceForm = ({ setDisplayForm, dbData, updateAbout }) => {
  const [CloseModal, setCloseModal] = useState(false);
  const [data, setData] = useState({
    jobRole: "",
    company: "",
    jobType: "",
    from: "",
    to: "",
    description: "",
  });

  useEffect(() => {
    setData({ ...dbData[0] });
  }, [dbData]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await updateAbout({
      experienceDetails: [data],
    });

    if (json?.success) {
      toast.success("Details Submitted successfully", {
        position: "top-center",
        duration: 2500,
      });
      setDisplayForm();
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "jobRole") {
      setCloseModal(true);
      if (e.target.value === "") {
        setCloseModal(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-8 md:my-16 px-4 box-border">
      {/* {data?.map((form, index) => {
          return ( */}
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center border border-[#E6E6E6] w-full md:w-auto px-8 md:px-[52px] py-[47px] shadow-black rounded-md box-border">
        <h1 className="text-lg md:text-xl font-semibold">Experience</h1>

        <form
          className="flex flex-col w-full md:w-[454px] items-center gap-6 text-sm md:text-lg"
          onSubmit={handleSubmit}
        >
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Job Role"
              name="jobRole"
              id="jobRole"
              value={data?.jobRole}
              onChange={handleChange}
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
              required
            />
            {CloseModal && (
              <div className="flex flex-col absolute top-[55px] bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50">
                {jobsData
                  ?.filter((e, i) => {
                    return e
                      ?.toLowerCase()
                      .startsWith(data?.jobRole?.toLowerCase());
                  })
                  ?.slice(0, 6)
                  ?.map((e, i) => {
                    return (
                      <span
                        key={i}
                        className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                        onClick={() => {
                          setData({ ...data, jobRole: e });
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
            placeholder="Company Name"
            name="company"
            id="company"
            value={data?.company}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4"
            required
          />

          <select
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-1 py-2"
            id="jobType"
            name="jobType"
            onChange={handleChange}
            required
            value={data?.jobType}
            autoComplete="on"
          >
            <option value="" disabled selected className="text-[#adadad]">
              Select Job Type
            </option>
            {jobTypes?.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>

          <input
            placeholder="From Date"
            name="from"
            id="from"
            value={data?.from}
            // type="date"
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            onFocus={(e) => {
              e.target.type = "date";
            }}
            required
          />
          <input
            placeholder="To Date"
            name="to"
            id="to"
            value={data?.to}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            max={new Date().toISOString().split("T")[0]} // Set max date to today
            onFocus={(e) => {
              e.target.type = "date";
            }}
            required
          />
          <textarea
            placeholder="Description"
            name="description"
            id="description"
            value={data?.description}
            rows={5}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg px-4 py-2"
          />

          {/* {data?.length === index+1 && <p
                  className="text-main-blue-01 text-lg cursor-pointer"
                  onClick={() => {
                    let newArr = data.concat({
                      jobRols: "",
                      company: "",
                      jobType: "",
                      from: "",
                      to: "",
                      description: "",
                    });
                    setData(newArr);
                  }}
                >
                  + Add more experience
                </p>} */}

          <button
            type="submit"
            className="w-[242px] bg-main-blue-01 rounded-lg py-2 md:py-3 text-sm md:text-xl text-white hover:scale-105 transition-transform"
          >
            Next
          </button>
        </form>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

const SkillsForm = ({ dbData, updateAbout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [skills, setSkills] = useState([]);
  const [CloseModal, setCloseModal] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await updateAbout({
      skills: skills,
      readyToApply: true,
    });

    if (json?.success) {
      toast.success("Details Submitted successfully", {
        position: "top-center",
        duration: 2500,
      });
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setCloseModal(true);
    setData(e.target.value);
    if (e.target.value === "") {
      setCloseModal(false);
    }
  };

  useEffect(() => {
    setSkills(dbData);
  }, [dbData]);

  return (
    <div className="flex items-center justify-center w-full my-8 md:my-16 px-4 box-border">
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center border border-[#E6E6E6] w-full md:w-auto px-8 md:px-[52px] py-[47px] shadow-black rounded-md box-border">
        <h1 className="text-lg md:text-xl font-semibold">Skills</h1>

        <span className="text-xs md:text-sm -mt-5 text-center">
          Stand out to top recruiters with relevant skills.
        </span>

        <div className="flex items-center w-full md:w-[400px] p-2 md:p-5 border gap-2 border-[#5858581F] relative text-sm">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Skills"
            onChange={handleChange}
            value={data}
            className="focus:outline-none"
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                e?.preventDefault();
                setSkills([...skills, data]);
                setData("");
                setCloseModal(false);
              }
            }}
          />
          {CloseModal && (
            <div className="flex flex-col absolute left-0 top-[70px] bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50 flex-wrap">
              {skillsData
                ?.filter((e, i) => {
                  return (
                    e?.toLowerCase().startsWith(data?.toLowerCase()) &&
                    !skills.includes(e)
                  );
                })
                ?.slice(0, 6)
                ?.map((e, i) => {
                  return (
                    <span
                      key={i}
                      className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                      onClick={() => {
                        setSkills([...skills, e]);
                        setData("");
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
        <span className="w-full text-[10px] -mt-4 md:-mt-7 text-gray-500">
          Add between 5-10 skills and get noticed by HR
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5 min-h-[50px] w-full md:max-w-[400px]">
          {skills?.map((e2, index) => {
            return (
              <span
                className="rounded-md bg-main-blue-01 text-white font-bold px-2 md:px-[13px] py-[5px] flex items-center gap-2 text-xs md:text-sm"
                key={e2}
              >
                {e2}{" "}
                <MdCancel
                  color="white"
                  size={17}
                  className="cursor-pointer"
                  onClick={() => {
                    let arr = skills
                      .slice(0, index)
                      .concat(skills.slice(index + 1));
                    setSkills(arr);
                    setCloseModal(false);
                  }}
                />
              </span>
            );
          })}
        </div>

        <button
          className="w-[242px] bg-main-blue-01 rounded-lg py-2 md:py-3 text-sm md:text-xl text-white hover:scale-105 transition-transform"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const About = () => {
  const [displayForm, setDisplayForm] = useState(1);

  const [dbData, setDbData] = useState(null);

  const { updateAbout } = useContext(employeeContext);

  // fetching the about data --------------------
  let { data: aboutData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employee/getAbout`,
    "get",
    {
      headers: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    }
  );

  useEffect(() => {
    setDbData({ ...aboutData?.data });
  }, [aboutData]);
  

  return (
      <div className="w-full px-2 md:px-32 box-border flex md:flex-row flex-col items-center md:items-start justify-between relative">
      <div className="w-full flex flex-row md:flex-col items-start relative top-2 md:top-20">
        <p className="flex flex-col md:flex-row items-center gap-2 text-main-blue-01 text-xs text-center md:text-lg font-semibold uppercase cursor-pointer" onClick={()=>{setDisplayForm(1)}}>
        <span className={`p-3 border border-main-blue-01 rounded-full text-xl hover:bg-main-blue-01 hover:text-white ${displayForm === 1  ? "bg-main-blue-01 text-white" : "bg-white text-main-blue-01"}`}><CgProfile /></span> Personal Details
        </p>
        <div className="hidden md:block md:h-20 p-[1px] bg-main-blue-01 relative left-5"></div>
        <p className="flex flex-col md:flex-row items-center gap-2 text-main-blue-01 text-xs text-center md:text-lg font-semibold uppercase cursor-pointer" onClick={()=>{aboutData?.data?.mobNumber ? setDisplayForm(2) : toast.error("Fill Personal Details Completely")}}>
        <span className={`p-3 border border-main-blue-01 rounded-full text-xl hover:bg-main-blue-01 hover:text-white ${displayForm === 2  ? "bg-main-blue-01 text-white" : "bg-white text-main-blue-01"}`}><FaBook /></span> Educational Details
        </p>
        <div className="hidden md:block md:h-20 p-[1px] bg-main-blue-01 relative left-5"></div>
        <p className="flex flex-col md:flex-row items-center gap-2 text-main-blue-01 text-xs text-center md:text-lg font-semibold uppercase cursor-pointer" onClick={()=>{aboutData?.data?.mobNumber ? setDisplayForm(3) : toast.error("Fill Personal Details Completely")}}>
        <span className={`p-3 border border-main-blue-01 rounded-full text-xl hover:bg-main-blue-01 hover:text-white ${displayForm === 3  ? "bg-main-blue-01 text-white" : "bg-white text-main-blue-01"}`}><GiAchievement /></span>Your Experiences
        </p>
        <div className="hidden md:block md:h-20 p-[1px] bg-main-blue-01 relative left-5"></div>
        <p className="flex flex-col md:flex-row items-center gap-2 text-main-blue-01 text-xs text-center md:text-lg font-semibold uppercase cursor-pointer" onClick={()=>{aboutData?.data?.mobNumber ? setDisplayForm(4) : toast.error("Fill Personal Details Completely")}}>
        <span className={`p-3 border border-main-blue-01 rounded-full text-xl hover:bg-main-blue-01 hover:text-white ${displayForm === 4  ? "bg-main-blue-01 text-white" : "bg-white text-main-blue-01"}`}><TbFileAnalytics /></span> Your Skills
        </p>
      </div>

      <div>
      {displayForm === 1 ? (
        <AboutForm
          setDisplayForm={() => setDisplayForm(displayForm + 1)}
          dbData={dbData}
          updateAbout={updateAbout}
        />
      ) : displayForm === 2 ? (
        <EducationForm
          setDisplayForm={() => setDisplayForm(displayForm + 1)}
          dbData={dbData?.educationDetails}
          updateAbout={updateAbout}
        />
      ) : displayForm === 3 ? (
        <ExperienceForm
          setDisplayForm={() => setDisplayForm(displayForm + 1)}
          dbData={dbData?.experienceDetails}
          updateAbout={updateAbout}
        />
      ) : (
        <SkillsForm dbData={dbData?.skills} updateAbout={updateAbout} />
      )}
      </div>

      </div>


    
  );
};

export default About;
