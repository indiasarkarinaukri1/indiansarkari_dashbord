import JobManagementOption from "@/components/job-management-option";
import apiurl from "@/utils";
import { AnswerKeyList } from "@/components/answer-key-list";
const fetchFromData = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/jobupdate/get/answer-keys`, {
      method: "GET",
      cache: "no-cache",
    });
    const result = await apiResponse.json();
    console.log(result);
    return result;
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
};
export default async function AnswerKey() {
  const apiPostFormData = await fetchFromData();
  //console.log(apiPostFormData);

  return (
    <>
      <JobManagementOption
        link="add-answer-key"
        pageName="Answer Key Page"
        option="New Answer Key"
      />
      <h1 className="font-bold text-3xl text-gray-900">
        All AnswerKey List Here
      </h1>
      <AnswerKeyList
        apiPostFormData={apiPostFormData}
        updatRouteType="add-answer-key"
        apiRoute="answer"
      />
    </>
  );
}
