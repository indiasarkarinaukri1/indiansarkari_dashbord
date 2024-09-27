"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const JobManagementOption = ({ link, pageName, option }) => {
  const router = useRouter();
  return (
    <div className="mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4">This Is the {pageName}</h2>
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-500 underline">
          Go Back
        </Link>

        <button
          onClick={() => router.push(link)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md p-2 shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Add {option}
          <span className="font-bold text-2xl p-1">+</span>
        </button>
      </div>
    </div>
  );
};

export default JobManagementOption;
