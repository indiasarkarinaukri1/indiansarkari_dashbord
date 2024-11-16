"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashBoard from "@/app/pages/sidebar/dashboard/DashBoard";
import JobManagement from "@/app/pages/sidebar/job-management/JobManagement";
import { jobManagementItems } from "@/utils";
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
        <div className="ml-2 mt-2 space-y-2">
          {jobManagementItems.map((item) => (
            <p
              key={item.path}
              onClick={() => router.push(item.path)}
              className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
      {/* <div onClick={handleWebsiteManagementClick} className="mt-2">
        <WebsiteManagement />
      </div> */}
      {/* {isOpenWebsite && (
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
            Web Stories Management
          </p>

          <p
            onClick={() => router.push("answer-key")}
            className="bg-white shadow rounded-md p-2 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            All Page SEO Content Management
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
