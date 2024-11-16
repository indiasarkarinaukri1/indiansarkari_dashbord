import CategoryList from "@/components/category-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchApiResponse = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/category`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();

    return result.rows;
  } catch (error) {
    console.log(error);
    //throw new Error(error);
  }
};
const CategoryManagement = async () => {
  const apiPostFormData = await fetchApiResponse();
  return (
    <div>
      <JobManagementOption
        link="add-category-management"
        pageName="Category Management Page"
        option="New Category Mangement"
      />
      <CategoryList
        apiPostFormData={apiPostFormData}
        updateRoute="add-category-management"
        deleteRoute="category"
      />
    </div>
  );
};

export default CategoryManagement;
