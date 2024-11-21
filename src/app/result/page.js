import { ResultList } from "@/components/result-list";
import apiurl from "@/utils";
const fetchFormData = async () => {
  try {
    const apiResponse = await fetch(`${apiurl}/jobupdate/get/results`, {
      method: "GET",
      cache: "no-cache",
    });

    const result = await apiResponse.json();
    return result;
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
};
export default async function Result() {
  const apiPostFormData = await fetchFormData();
  return (
    <>
      <div className="font-bold text-3xl text-gray-800">
        all Result list here
        <ResultList
          apiRoute="result"
          apiPostFormData={apiPostFormData}
          updatRouteType="add-result"
        />
      </div>
    </>
  );
}
