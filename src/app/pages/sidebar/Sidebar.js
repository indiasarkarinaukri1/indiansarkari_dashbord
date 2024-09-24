"use client";
import { useState } from "react";
import DashBoard from "./dashboard/DashBoard";
import JobManagement from "./job-management/JobManagement";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleJobManagementClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen max-w-56 bg-slate-100">
      <div className="m-2">
        <DashBoard />
        <div onClick={handleJobManagementClick}>
          <JobManagement />
        </div>
      </div>
      {isOpen && (
        <div className="ml-6 mt-2 space-y-2">
          <p
            onClick={() => router.push("job-post")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Job Post
          </p>
          <p className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer">
            Admit Card
          </p>
          <p className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer">
            Answer Key
          </p>
          <p className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer">
            Result
          </p>
          <p className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer">
            Syllabus
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
