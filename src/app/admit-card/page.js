import JobManagementOption from "@/components/job-management-option";
import { JobPostList } from "@/components/job-post-list";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(
      "https://2aca07c8-73ea-4f73-82d7-9bcd869a37fb-00-efcuu5mloosk.sisko.replit.dev/api/job-posts",
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
