import CategoryList from "@/components/category-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchApiResponse = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/subcategory`, {
      method: "GET",
      cache: "no-store",
    });
    const result = apiResponse.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const SubCategoryManagement = async () => {
  const apiPostFormData = await fetchApiResponse();
  return (
    <div>
      <JobManagementOption
        link="add-sub-category-management"
        pageName="Sub-Category Management Page"
        option="New Sub Category Mangement"
      />
      <CategoryList
        apiPostFormData={apiPostFormData}
        updateRoute="add-sub-category-management"
        deleteRoute="subcategory"
      />
    </div>
  );
};

export default SubCategoryManagement;
