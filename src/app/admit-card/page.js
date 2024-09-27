import JobManagementOption from "@/components/job-management-option";
import { JobPostList } from "@/components/job-post-list";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(
      "https://4c8a9b33-9a59-44e9-96a8-5565e100af74-00-2tlr0w1o5f2ne.sisko.replit.dev/api/job-posts",
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
export default async function AdmitCard() {
  const apiPostFormData = await fetchFormData();

  return (
    <>
      <JobManagementOption
        link="add-admit-card"
        pageName="Admit Card Page"
        option="New Admit Card"
      />
      <div className="font-bold text-3xl text-gray-800">
        all job post list here
        <JobPostList apiPostFormData={apiPostFormData} />
      </div>
    </>
  );
}
