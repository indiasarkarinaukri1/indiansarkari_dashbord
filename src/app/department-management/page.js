import CategoryList from "@/components/category-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchApiResponse = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/depertment`, {
      method: "GET",
      cache: "no-store",
    });
    const result = apiResponse.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const StateManagement = async () => {
  const apiPostFormData = await fetchApiResponse();
  return (
    <div>
      <JobManagementOption
        link="add-department-management"
        pageName="Department Management Page"
        option="New Department Mangement"
      />
      <CategoryList
        apiPostFormData={apiPostFormData}
        updateRoute="add-department-management"
        deleteRoute="depertment"
      />
    </div>
  );
};

export default StateManagement;
