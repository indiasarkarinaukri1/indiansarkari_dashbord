import JobManagementOption from "@/components/job-management-option";
import { JobPostList } from "@/components/job-post-list";
import apiurl from "@/utils";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(
      `${apiurl}/jobupdate/admit-cards`,
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
        <JobPostList
          apiPostFormData={apiPostFormData}
          updatRouteType="add-admit-card"
          apiRoute="admit"
        />
      </div>
    </>
  );
}
