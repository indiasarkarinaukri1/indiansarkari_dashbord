"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import apiurl from "@/utils";
import ModalForm from "./ModalForm/ModalForm";
import SearchBar from "../search";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FilterComponent from "../filter-component/FilterComponent";
import { htmlToText } from "html-to-text";

export function AdmissionList({ apiPostFormData, updatRouteType, apiRoute }) {
  const [showModal, setShowModal] = useState(false);
  const [admissionId, setAdmissionJobId] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFilteredData(apiPostFormData || []);
    //router.refresh();
  }, [apiPostFormData]);

  const locations = Array.from(
    new Set(apiPostFormData?.map((job) => job.State?.name || "") || [])
  );
  const categories = Array.from(
    new Set(apiPostFormData?.map((job) => job.Category?.name || "") || [])
  );
  const departments = Array.from(
    new Set(apiPostFormData?.map((job) => job.Depertment?.name || "") || [])
  );

  const contentData = apiPostFormData?.map((contentItem) =>
    htmlToText(contentItem.content, {
      wordwrap: 130,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    })
  );

  const handleSearch = (term) => {
    const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());
    const filtered = apiPostFormData.filter((formData) =>
      searchTerms.some((searchTerm) =>
        Object.values(formData).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
        )
      )
    );

    setFilteredData(filtered);
  };

  const deleteFormData = async (getCurrentID) => {
    try {
      const isResponse = await fetch(`${apiurl}/${apiRoute}/${getCurrentID}`, {
        method: "DELETE",
      });
      if (isResponse.ok) router.refresh();
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const updateFormData = (getCurrentFormData) => {
    const query = encodeURIComponent(JSON.stringify(getCurrentFormData));
    router.push(`${updatRouteType}?format=${query}`);
  };

  const renderCell = (data) => {
    if (!data) return "";
    return data.length > 5 ? `${data.substring(0, 5)}...` : data;
  };

  function OpenHandler(id) {
    alert(id);
    setAdmissionJobId(id);
    setShowModal(true);
  }

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  const handleFilter = (filters) => {
    const filtered = apiPostFormData.filter((job) => {
      const locationMatch = job["State"]["name"]
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const departmentMatch = job["Depertment"]["name"]
        .toLowerCase()
        .includes(filters.department.toLowerCase());
      const categoryMatch = job["Category"]["name"]
        .toLowerCase()
        .includes(filters.category.toLowerCase());

      const jobDate = job.created_at ? new Date(job.created_at) : null;
      const dateFrom = filters.publishDate?.from
        ? new Date(filters.publishDate.from)
        : null;
      const dateTo = filters.publishDate?.to
        ? new Date(filters.publishDate.to)
        : null;

      const publishDateMatch =
        jobDate && dateFrom && dateTo
          ? jobDate >= dateFrom && jobDate <= dateTo
          : true; // No filter selected, match all

      const contentMatch = job["content"]
        .toLowerCase()
        .includes(filters.content.toLowerCase());

      const salaryMatch = job["content"].match(/salary\s*=\s*(\d+)-(\d+)/);
      const salaryInRange =
        salaryMatch &&
        filters.salary >= Number(salaryMatch[1]) &&
        filters.salary <= Number(salaryMatch[2]);

      // Age check
      const ageMatch = job["content"].match(/age\s*=\s*(\d+)-(\d+)/);
      const ageInRange =
        ageMatch &&
        filters.age >= Number(ageMatch[1]) &&
        filters.age <= Number(ageMatch[2]);

      //exprience check
      const exprienceMatch = job["content"].match(
        /exprience\s*=\s*(\d+)-(\d+)/
      );
      const exprienceInRange =
        exprienceMatch &&
        filters.exprience >= Number(exprienceMatch[1]) &&
        filters.exprience <= Number(exprienceMatch[2]);

      // If no filters for age, default to true
      const ageRangeValid = filters.age ? ageInRange : true;
      // If no filters for salary, default to true
      const salaryRangeValid = filters.salary ? salaryInRange : true;
      // If no filters for exprience, default to true
      const exprienceRangeValid = filters.exprience ? exprienceInRange : true;
      return (
        locationMatch &&
        departmentMatch &&
        categoryMatch &&
        contentMatch &&
        publishDateMatch &&
        salaryRangeValid &&
        ageRangeValid &&
        exprienceRangeValid
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
      <SearchBar onSearch={handleSearch} />
      {/* <FilterComponent
        onApplyFilter={handleFilter}
        locations={locations}
        categories={categories}
        departments={departments}
        contentData={contentData}
        dateLabel="Publish"
      /> */}

      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        admissionId={admissionId}
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[90%] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex justify-between">
            <DialogTitle>Content Preview</DialogTitle>
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 p-2 border-none outline-none rounded "
            />
          </DialogHeader>
          <div className="p-4 text-gray-700">
            {parse(
              dialogContent
                .split("\n")
                .filter((line) =>
                  line.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .join("\n")
            )}
          </div>
        </DialogContent>
      </Dialog>
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
              "Actions",
              "Job Update",
            ].map((header) => (
              <TableHead
                key={header}
                className="p-4 font-bold text-gray-700 border-b-2"
              >
                {header.toUpperCase()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((formData) => (
              <TableRow
                key={formData?.id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell className="p-4 text-gray-800">
                  {renderCell(formData?.title)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.created_at)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.description)}
                </TableCell>
                <TableCell className="p-4 text-gray-600 truncate">
                  <a
                    href="#"
                    onClick={() => openContentDialog(formData?.content)}
                    className="text-blue-500 hover:underline"
                  >
                    {renderCell(formData?.content)}
                  </a>
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
              <TableCell colSpan={10} className="text-center p-4">
                No job posts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
