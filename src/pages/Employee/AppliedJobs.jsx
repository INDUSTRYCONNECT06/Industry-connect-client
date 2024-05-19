import React, { useEffect } from "react";
import useFetch from "../../helpers/useFetch";
import { JobCard } from "../Search/SearchJobs";
import SeoTagger from "../../components/SeoTagger";

const AppliedJobs = () => {
  let { data: jobsData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employee/getAppliedJobs`,
    "get",
    {
      headers: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    }
  );

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-8 items-center justify-center mt-6 md:mt-10">
        <h1 className="text-2xl md:text-4xl font-bold uppercase">
          APPLIED <span className="text-main-blue-01">JOBS</span>
        </h1>
        <span className="text-sm md:text-xl mb-6 text-center">
          List of jobs you have applied at.
        </span>

        <section className="w-[95vw] md:w-[85vw] p-2 md:p-10 bg-[#FAFAFA] my-10 flex items-start justify-between h-max">
          {/* Employee list */}
          <div className="w-full md:p-6">
            <div className="mb-6">
              <span className="text-xl md:text-3xl font-semibold">
                {jobsData?.data?.length} Jobs
              </span>
            </div>

            <section className="w-full flex flex-col gap-8">
              {jobsData?.data &&
                jobsData?.data?.map((element) => {
                  return (
                    <JobCard
                      key={element?._id}
                      {...element?.jobId}
                      appliedButton={false}
                      bookmarkedButton={false}
                      appliedAt={element?.createdAt}
                    />
                  );
                })}
            </section>
          </div>
        </section>
      </div>

      <SeoTagger
        title="View Applied Jobs | Industry Connect"
        description="Track and manage your job applications on Industry Connect. Stay
        updated on the status of your applications and take the next step towards your dream
        career."
      />
    </>
  );
};

export default AppliedJobs;
