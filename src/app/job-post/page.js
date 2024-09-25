import Link from "next/link";

export default function JobPost() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">This Is the Job Post Page</h2>
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-500 underline">
          Go Back
        </Link>
        <Link href="/add-job-post">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md p-2 shadow-lg hover:bg-blue-700 transition duration-200">
            Add Job Post<span className="font-bold text-2xl p-1">+</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
