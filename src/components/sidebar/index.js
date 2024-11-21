"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashBoard from "@/app/pages/sidebar/dashboard/DashBoard";
import JobManagement from "@/app/pages/sidebar/job-management/JobManagement";
import { jobManagementItems } from "@/utils";
import { AdmissionManagementItems } from "@/utils";
import UserManagement from "@/app/pages/sidebar/user-management/page";
import WebsiteManagement from "@/app/pages/sidebar/website-management/page";
import AdmissionManagement from "@/app/pages/sidebar/admission-management";

const Sidebar = () => {
  const [isOpenJob, setIsOpenJob] = useState(false);
  const [isOpenAdmission, setIsOpenAdmission] = useState(false);
  const router = useRouter();

  const handleJobManagementClick = () => {
    setIsOpenJob((prev) => !prev);
  };

  const handleAdmissionManagementClick = () => {
    setIsOpenAdmission((prev) => !prev);
  };

  return (
    <div className="min-h-screen max-w-56 bg-slate-100">
      <div className="m-2">
        <DashBoard />
        <UserManagement />
        {/* Job Management Section */}
        <div>
          <div onClick={handleJobManagementClick}>
            <JobManagement />
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
        </div>
        {/* Admission Section */}
        <div onClick={handleAdmissionManagementClick}>
          <AdmissionManagement />
        </div>
        {isOpenAdmission && (
          <div className="ml-2 mt-2 space-y-2">
            {AdmissionManagementItems.map((item) => (
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
      </div>
    </div>
  );
};

export default Sidebar;
