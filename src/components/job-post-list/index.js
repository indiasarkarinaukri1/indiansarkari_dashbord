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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import apiurl from "@/utils";
import ModalForm from "./ModalForm/ModalForm";

export function JobPostList({ apiPostFormData, updatRouteType, apiRoute }) {
  const [showModal, setShowModal] = useState(false);
  const [jobId, setJobId] = useState(null);
  const router = useRouter();

  const deleteFormData = async (getCurrentID) => {
    try {
      const isResponse = await fetch(`${apiurl}/${apiRoute}/${getCurrentID}`, {
        method: "DELETE",
      });
      console.log(`Response Status: ${isResponse.status}`);
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

  const updateFormData = (getCurrentFormData) => {
    const query = encodeURIComponent(JSON.stringify(getCurrentFormData));
    router.push(`${updatRouteType}?format=${query}`);
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  const renderCell = (data) => {
    if (!data) return "";
    return data.length > 5 ? `${data.substring(0, 5)}...` : data;
  };

  function OpenHandler(id) {
    setJobId(id);
    setShowModal(true);
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        jobId={jobId}
      />

      <Table className="min-w-full bg-white rounded-md border border-gray-200">
        <TableCaption className="text-gray-600 font-semibold text-lg py-3">
          A list of your Job Posts
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {[
              "Title",
              "Date",
              "Description",
              "Content",
              "Slug",
              "Meta Tags",
              "Meta Description",
              "Canonical URL",
              // "State",
              // "Category",
              // "Subcategory",
              // "Department",
              "Actions",
              "Job Update",
            ].map((header) => (
              <TableHead
                key={header}
                className="p-4 font-bold text-gray-700 border-b-2"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {apiPostFormData && apiPostFormData.length > 0 ? (
            apiPostFormData.map((formData) => (
              <TableRow
                key={formData.id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell className="p-4 text-gray-800">
                  {renderCell(formData.title)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.date)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.description)}
                </TableCell>
                <TableCell className="p-4 text-gray-600 truncate">
                  {renderCell(formData.content)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.slug)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.metaTags)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.metaDescription)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.canonicalUrl)}
                </TableCell>
                {/* <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.state_id?.name)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.category_id?.name)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.subcategory_id?.name)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData.department_id?.name)}
                </TableCell> */}
                <TableCell className="flex justify-end gap-2 p-4">
                  <Button
                    onClick={() => updateFormData(formData)}
                    className="bg-blue-500 text-white"
                  >
                    <MdModeEditOutline />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteFormData(formData.id)}
                    className="bg-red-500 text-white"
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </TableCell>
                {/* here i am going to add what job upadte column */}
                <TableCell className="p-4 text-gray-600">
                  <Button
                    onClick={() => OpenHandler(formData.id)}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={13} className="text-center p-4">
                No job posts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
