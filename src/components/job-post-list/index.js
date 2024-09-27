"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
export function JobPostList({ apiPostFormData }) {
  const router = useRouter();
  const deleteFormData = async (getCurrentID) => {
    try {
      const isResponse = await fetch(
        `https://4c8a9b33-9a59-44e9-96a8-5565e100af74-00-2tlr0w1o5f2ne.sisko.replit.dev/api/job-posts/${getCurrentID}`,
        {
          method: "DELETE",
        }
      );

      if (!isResponse.ok) {
        const errorText = await isResponse.text();
        console.error(
          `Error deleting job post: ${isResponse.status} - ${errorText}`
        );
        return;
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  const renderCell = (data) => {
    return data ? data : "";
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
      <Table className="min-w-full bg-white rounded-md border border-gray-200">
        <TableCaption className="text-gray-600 font-semibold text-lg py-3">
          A list of your Job Posts
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Title
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Date
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Short Info
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 text-right border-b-2">
              Content
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Slug
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Meta Tags
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Meta Description
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Canonical URL
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              State
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Categories
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Created By
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {apiPostFormData &&
            apiPostFormData.length > 0 &&
            apiPostFormData.map((formData) => (
              <TableRow
                key={formData.id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell className="p-4 text-gray-800">
                  {renderCell(formData?.title)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.date)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.shortInformation)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.content)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.slug)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.metaTags)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.metaDescription)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.canonicalUrl)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.state)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.categories)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.created_by)}
                </TableCell>
                <Button>
                  <MdModeEditOutline />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteFormData(formData.id)}
                >
                  <RiDeleteBin6Line />
                </Button>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
