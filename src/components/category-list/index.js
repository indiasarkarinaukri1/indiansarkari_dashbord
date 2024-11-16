"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import apiurl from "@/utils";

const CategoryList = ({ apiPostFormData, deleteRoute, updateRoute }) => {
  const router = useRouter();
  const handelDeleteModel = async (getCurrentID) => {
    try {
      const apiResponse = await fetch(
        `${apiurl}/${deleteRoute}/${getCurrentID}`,
        {
          method: "DELETE",
        }
      );
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      } else router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handelEditMode = (getCurrentData) => {
    const query = encodeURIComponent(JSON.stringify(getCurrentData));
    router.push(`${updateRoute}?format=${query}`);
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
          A list of your Category
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2 w-40">
              Category Name
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2 w-40">
              Slug
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2 w-40">
              Created By
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2 w-40">
              Updated By
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
                <TableCell className="p-4 text-gray-800 w-40 truncate whitespace-nowrap overflow-hidden">
                  {renderCell(formData?.name)}
                </TableCell>
                <TableCell className="p-4 text-gray-800 w-40 truncate whitespace-nowrap overflow-hidden">
                  {renderCell(formData?.slug)}
                </TableCell>
                <TableCell className="p-4 text-gray-800 w-40 truncate whitespace-nowrap overflow-hidden">
                  {renderCell(formData?.created_by)}
                </TableCell>

                <TableCell className="p-4 text-gray-600 w-40 truncate whitespace-nowrap overflow-hidden">
                  {renderCell(formData?.updated_by)}
                </TableCell>
                <TableCell className="p-4">
                  <Button onClick={() => handelEditMode(formData)}>
                    <MdModeEditOutline />
                  </Button>
                </TableCell>
                <TableCell className="p-4">
                  <Button
                    variant="destructive"
                    onClick={() => handelDeleteModel(formData.id)}
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;
