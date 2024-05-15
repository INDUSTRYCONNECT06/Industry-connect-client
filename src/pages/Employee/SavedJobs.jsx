import SeoTagger from "../../components/SeoTagger";
import useFetch from "../../helpers/useFetch";
import { JobCard } from "../Search/SearchJobs";

const SavedJobs = () => {
  let { data: jobsData } = useFetch(
    `${import.meta.env.VITE_HOST}/api/employee/getBookmarkedJobs`,
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
          SAVED <span className="text-main-blue-01">JOBS</span>
        </h1>
        <span className="text-sm md:text-xl mb-6 text-center">
          List of all jobs you have bookmarked.
        </span>

        <section className="w-[95vw] md:w-[85vw] p-2 md:p-10 bg-[#FAFAFA] my-10 flex items-start justify-between h-max">
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
                      jobData={element?.jobId}
                      orgData={element?.jobId?.employerId}
                      key={element?._id}
                      bookmarkedData={true}
                    />
                  );
                })}
            </section>
          </div>
        </section>
      </div>

      <SeoTagger
        title="Save Jobs for Later | Industry Connect"
        description="Bookmark promising job opportunities on Industry Connect to revisit
them later. Never miss out on your preferred positions and streamline your job search."
      />
    </>
  );
};

export default SavedJobs;
