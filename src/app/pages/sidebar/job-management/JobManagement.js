import { MdManageAccounts } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const JobManagement = () => {
  return (
    <div className="cursor-pointer rounded-r-3xl hover:bg-slate-200 border-l-black p-2 shadow-md transition duration-200">
      <div className="flex items-center">
        <MdManageAccounts className="text-3xl text-gray-800 hover:text-gray-600 transition duration-200 shadow-md rounded-lg p-1" />
        <p className="font-semibold ml-2">JobManagement</p>
        <IoMdArrowDropdown className="ml-3" />
      </div>
    </div>
  );
};

export default JobManagement;
