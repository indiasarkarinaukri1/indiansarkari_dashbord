import { AdmitCardList } from "@/components/admit-card-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/jobupdate/get/admit-cards`, {
      method: "GET",
      cache: "no-cache",
    });

    const result = await apiResponse.json();
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};
export default async function AdmitCard() {
  const apiPostFormData = await fetchFormData();
  // const apiPostFormData = apiPostForm.map((data) => data.Job);
  // console.log(apiPostFormData);
  return (
    <>
      <JobManagementOption
        link="add-admit-card"
        pageName="Admit Card Page"
        option="New Admit Card"
      />
      <div className="font-bold text-3xl text-gray-800">
        all AdmitCard list here
        <AdmitCardList
          apiPostFormData={apiPostFormData}
          updatRouteType="add-admit-card"
          apiRoute="jobupdate"
        />
      </div>
    </>
  );
}
