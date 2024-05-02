import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  citiesData,
  jobCategories,
  jobTypes,
  jobsData,
  skillsData,
} from "../../assets/data/sample";
import { MdCancel } from "react-icons/md";
import { employerContext } from "../../Context/EmployerState";
import toast from "react-hot-toast";

const PostJob = () => {
  const navigate = useNavigate();

  const { createJob } = useContext(employerContext);

  const [CloseModal, setCloseModal] = useState({
    title: false,
    location: false,
    skills: false,
  });
  const [skills, setSkills] = useState([]);

  const [data, setData] = useState({
    title: "",
    location: "",
    skills: "",
    totalVacancy: 0,
    experience: 0,
    salary: 0,
    description: "",
    jobCategory: null,
    jobType:null
  });

  const handleSubmit = async (e) => {
    e?.preventDefault();

    let json = await createJob({
      ...data,
      skillsArr: skills,
    });

    if (json?.success) {
      setData({
        title: "",
        location: "",
        skills: "",
        totalVacancy: 0,
        experience: 0,
        salary: 0,
        description: "",
      });
      toast.success("Job Posted successfully", {
        position: "top-center",
        duration: 2500,
      });

      navigate("/search/employees");
    } else {
      toast.error("Some error occured in posting the job. Please try again!", {
        position: "top-center",
        duration: 2500,
      });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "location") {
      setCloseModal({ ...CloseModal, location: true });
      if (e.target.value === "") {
        setCloseModal({ ...CloseModal, location: false });
      }
    }

    if (e.target.name === "title") {
      setCloseModal({ ...CloseModal, title: true });
      if (e.target.value === "") {
        setCloseModal({ ...CloseModal, title: false });
      }
    }

    if (e.target.name === "skills") {
      setCloseModal({ ...CloseModal, skills: true });
      if (e.target.value === "") {
        setCloseModal({ ...CloseModal, skills: false });
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full my-16">
        <div className="flex flex-col gap-10 items-center justify-center border border-[#E6E6E6] px-[52px] py-[47px] shadow-black rounded-md">
          <h1 className="text-xl font-semibold">Post a job</h1>

          <form
            className="flex flex-col w-[454px] items-center gap-6"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Job Title"
                name="title"
                id="title"
                value={data?.title}
                onChange={handleChange}
                className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
                required
              />

              {CloseModal?.title && (
                <div className="flex flex-col absolute top-[55px] bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50">
                  {jobsData
                    ?.filter((e, i) => {
                      return e
                        ?.toLowerCase()
                        .startsWith(data?.title?.toLowerCase());
                    })
                    ?.slice(0, 6)
                    ?.map((e, i) => {
                      return (
                        <span
                          key={i}
                          className=" py-3 px-6 w-full cursor-pointer hover:bg-main-blue-01 hover:text-white"
                          onClick={() => {
                            setData({ ...data, title: e });
                            setCloseModal({ ...CloseModal, title: false });
                          }}
                        >
                          {e}
                        </span>
                      );
                    })}
                </div>
              )}
            </div>

            <select
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-1 py-2"
              id="jobCategory"
              name="jobCategory"
              onChange={handleChange}
              required
              value={data?.jobCategory}
              autoComplete="on"
            >
              <option value="" disabled selected className="text-[#adadad]">
                Select Job Category
              </option>
              {jobCategories?.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>

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
              {CloseModal?.location && (
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

            <div className="w-full relative">
              <div className="w-full border border-[#5858581F] rounded-lg min-h-[120px] px-4 py-4 flex flex-wrap items-center justify-start gap-5">
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
                          setCloseModal({ ...CloseModal, skills: false });
                        }}
                      />
                    </span>
                  );
                })}
                {(!skills || skills?.length < 5) && (
                  <input
                    placeholder="Enter Skills"
                    name="skills"
                    id="skills"
                    className="focus:outline-none"
                    onKeyDown={(e) => {
                      if (e?.key === "Enter") {
                        e?.preventDefault();
                        setSkills([...skills, data?.skills]);
                        setData({ ...data, skills: "" });
                        setCloseModal({ ...CloseModal, skills: false });
                      }
                    }}
                    value={data?.skills}
                    onChange={handleChange}
                  />
                )}
              </div>
              {CloseModal?.skills && (
                <div className="flex flex-col absolute bg-[#e3e3e3] gap-2 w-full shadow-md box-border z-50">
                  {skillsData
                    ?.filter((e, i) => {
                      return (
                        e
                          ?.toLowerCase()
                          .startsWith(data?.skills?.toLowerCase()) &&
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
                            setData({ ...data, skills: "" });
                            setCloseModal({ ...CloseModal, skills: false });
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
              placeholder="Total Vacancy"
              name="totalVacancy"
              id="totalVacancy"
              type="number"
              className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4"
              required
              onChange={handleChange}
              maxLength={10}
              minLength={10}
            />

            <section className="w-full grid grid-cols-2 gap-4">
              <input
                placeholder="Experience (in years)"
                name="experience"
                id="experience"
                type="number"
                onChange={handleChange}
                className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
              />
              <input
                placeholder="Salary (in INR)"
                name="salary"
                id="salary"
                type="number"
                onChange={handleChange}
                className="w-full border border-[#5858581F] rounded-lg h-[51px] px-4 py-2"
              />
            </section>

            <textarea
              name="description"
              id="description"
              cols="30"
              rows="20"
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-[#5858581F] rounded-lg h-[151px] px-4 py-2 resize-none"
            />

            <button
              type="submit"
              className="w-[242px] bg-main-blue-01 rounded-lg py-3 text-xl text-white hover:scale-105 transition-transform"
            >
              POST NOW
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
