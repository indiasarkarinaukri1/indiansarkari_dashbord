import JobManagementOption from "@/components/job-management-option";
import PaperModelList from "@/components/paper-model-list";
import React from "react";
const fetchOldPaperModelData = async () => {
  try {
    const apiResponse = await fetch(
      "http://localhost:3000/api/get-old-model-paper",
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
const OldPaperModel = async () => {
  const apiPostFormData = await fetchOldPaperModelData();
  return (
    <>
      <JobManagementOption
        link="add-reading-book-model"
        pageName="Reading Book Modle Page"
        option="New Reading Book model"
      />
      <div className="font-bold text-3xl text-gray-800">
        All Reading Book Model List Here
        <PaperModelList
          apiPostFormData={apiPostFormData}
          updateRoute="add-reading-book-model"
        />
      </div>
    </>
  );
};

export default OldPaperModel;
