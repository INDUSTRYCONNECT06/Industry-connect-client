import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../helpers/useFetch";
import toast from "react-hot-toast";
import { employeeContext } from "../../Context/EmployeeState";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { jobTypes, jobsData, skillsData } from "../../assets/data/sample";
import { MdCancel } from "react-icons/md";

const AboutForm = ({ setDisplayForm, dbData, updateAbout }) => {
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
  };

  return (
    <div className="flex items-center justify-center w-full my-16">
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
        <h1 className="text-xl font-semibold">About Me</h1>

        <form
          className="flex flex-col w-[454px] items-center gap-6"
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
          <input
            type="text"
            placeholder="Location"
            name="location"
            id="location"
            value={data?.location}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />
          <input
            placeholder="Linkedin id"
            name="linkedinLink"
            id="linkedinLink"
            type="url"
            value={data?.linkedinLink}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
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
            className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform"
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
    <div className="flex items-center justify-center w-full my-16">
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
        <h1 className="text-xl font-semibold">Education</h1>

        <form
          className="flex flex-col w-[454px] items-center gap-6"
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
            placeholder="Field of Study"
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
          <input
            placeholder="Education Type"
            name="education"
            id="education"
            value={data?.education}
            onChange={handleChange}
            className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform"
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
    <div className="flex items-center flex-col justify-center w-full my-16 gap-10">
      {/* {data?.map((form, index) => {
          return ( */}
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
        <h1 className="text-xl font-semibold">Experience</h1>

        <form
          className="flex flex-col w-[454px] items-center gap-6"
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
            max={new Date().toISOString().split('T')[0]} // Set max date to today
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
            required
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
            className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform"
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
    <div className="flex items-center justify-center w-full my-8">
      <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
        <h1 className="text-xl font-semibold">Skills</h1>

        <span className="text-sm -mt-5">
          Stand out to top recruiters with relevant skills.
        </span>

        <div className="flex items-center w-[400px] p-5 border gap-2 border-[#5858581F] relative">
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
            <div className="flex flex-col absolute left-0 top-[70px] bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50">
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
        <span className="w-full text-[10px] -mt-7 text-gray-500">
          Add between 5-10 skills and get noticed by HR
        </span>

        <div className="flex flex-wrap items-center justify-center gap-5 min-h-[50px] max-w-[400px]">
          {skills?.map((e2, index) => {
            return (
              <span
                className="rounded-md bg-main-blue-01 text-white font-bold px-[13px] py-[5px] flex items-center gap-2"
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
          className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform mt-8"
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
    <>
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
    </>
  );
};

export default About;
