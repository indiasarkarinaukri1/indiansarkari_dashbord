import { AdmissionList } from "@/components/admission-list";
import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/admission`, {
      method: "GET",
      cache: "no-cache",
    });
    const result = await apiResponse.json();

    return result.rows;
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
};
export default async function Admission() {
  const apiPostFormData = await fetchFormData();

  return (
    <>
      <JobManagementOption
        link="add-admission"
        pageName="Govt. Admission Page"
        option="New Admission Post"
      />
      <div className="font-bold text-3xl text-gray-800">
        all Admission post list here
        <AdmissionList
          apiRoute="admission"
          apiPostFormData={apiPostFormData}
          updatRouteType="add-admission"
        />
      </div>
    </>
  );
}

// export const generateMetaData = async (formData) => {
//   if (!formData) return {};

//   // Define basic metadata fields based on formData
//   const metadata = {
//     title: apiPostFormData.title || "Add Job Post",
//     description:
//       apiPostFormData.metaDescription || apiPostFormData.description || "",
//     canonical: apiPostFormData.canonicalUrl || "",
//     metaTags: apiPostFormData.metaTags
//       ? apiPostFormData.metaTags.split(",").map((tag) => tag.trim())
//       : [],
//   };

//   return {
//     title: metadata.title,
//     description: metadata.description,
//     canonical: metadata.canonical,
//     metaTags: metadata.metaTags,
//   };
// };
