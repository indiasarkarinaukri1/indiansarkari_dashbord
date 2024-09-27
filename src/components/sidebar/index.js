"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import DashBoard from "@/app/pages/sidebar/dashboard/DashBoard";
import JobManagement from "@/app/pages/sidebar/job-management/JobManagement";

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

          <p
            onClick={() => router.push("admit-card")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Admit Card
          </p>

          <p
            onClick={() => router.push("answer-key")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Answer Key
          </p>
          <p
            onClick={() => router.push("result")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Result
          </p>
          <p
            onClick={() => router.push("syllabus")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Syllabus
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
