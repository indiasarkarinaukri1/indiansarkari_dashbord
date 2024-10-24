import JobManagementOption from "@/components/job-management-option";
import { JobPostList } from "@/components/job-post-list";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(
      "https://71669ed0-6720-40de-8851-af1c9261cc0a-00-3hjdx6mljzz47.sisko.replit.dev/job",
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const result = await apiResponse.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export default async function JobPost() {
  const apiPostFormData = await fetchFormData();
  return (
    <>
      <JobManagementOption
        link="add-job-post"
        pageName="Job Post Page"
        option="New Job Post"
      />
      <div className="font-bold text-3xl text-gray-800">
        all job post list here
        <JobPostList
          apiRoute="job"
          apiPostFormData={apiPostFormData}
          updatRouteType="add-job-post"
        />
      </div>
    </>
  );
}
