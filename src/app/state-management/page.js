import CategoryList from "@/components/category-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchApiResponse = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/state`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();
    return result.rows;
  } catch (error) {
    //throw new Error(error);
    console.log(error);
  }
};
const StateManagement = async () => {
  const apiPostFormData = await fetchApiResponse();
  return (
    <div>
      <JobManagementOption
        link="add-state-management"
        pageName="State Management Page"
        option="New State Mangement"
      />
      <CategoryList
        apiPostFormData={apiPostFormData}
        updateRoute="add-state-management"
        deleteRoute="state"
      />
    </div>
  );
};

export default StateManagement;
