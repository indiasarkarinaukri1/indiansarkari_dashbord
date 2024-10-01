import JobManagementOption from "@/components/job-management-option";
import { JobPostList } from "@/components/job-post-list";
const fetchFromData = async () => {
  try {
    const apiResponse = await fetch(
      "https://2aca07c8-73ea-4f73-82d7-9bcd869a37fb-00-efcuu5mloosk.sisko.replit.dev/api/answer",
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
export default async function AnswerKey() {
  const apiPostFormData = await fetchFromData();

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
      <JobPostList
        apiPostFormData={apiPostFormData}
        updatRouteType="add-answer-key"
        apiRoute="answer"
      />
    </>
  );
}
