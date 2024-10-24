"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import DashBoard from "@/app/pages/sidebar/dashboard/DashBoard";
import JobManagement from "@/app/pages/sidebar/job-management/JobManagement";
import UserManagement from "@/app/pages/sidebar/user-management/page";
import WebsiteManagement from "@/app/pages/sidebar/website-management/page";

const Sidebar = () => {
  const [isOpenJob, setIsOpenJob] = useState(false);
  const [isOpenWebsite, setIsOpenWebsite] = useState(false);
  const router = useRouter();
  const handleJobManagementClick = () => {
    setIsOpenJob((prev) => !prev);
  };
  const handleWebsiteManagementClick = () => {
    setIsOpenWebsite((prev) => !prev);
  };
  return (
    <div className="min-h-screen max-w-56 bg-slate-100">
      <div className="m-2">
        <DashBoard />
        <UserManagement />
        <div onClick={handleJobManagementClick}>
          <JobManagement />
        </div>
      </div>
      {isOpenJob && (
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
            onClick={() => router.push("old-paper-model")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Old Paper Model
          </p>
          <p
            onClick={() => router.push("reading-book-model")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Reading Book Model
          </p>
          <p
            onClick={() => router.push("category-management")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Category
          </p>
          <p
            onClick={() => router.push("sub-category-management")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            SubCategory
          </p>
          <p
            onClick={() => router.push("state-management")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            State
          </p>
          <p
            onClick={() => router.push("department-management")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Department
          </p>
        </div>
      )}
      <div onClick={handleWebsiteManagementClick} className="mt-2">
        <WebsiteManagement />
      </div>
      {isOpenWebsite && (
        <div className="ml-6 mt-2 space-y-2">
          <p
            onClick={() => router.push("job-post")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Blog Management
          </p>

          <p
            onClick={() => router.push("admit-card")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            Web Stories Managemen
          </p>

          <p
            onClick={() => router.push("answer-key")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            All Page SEO Content Management
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
