"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import apiurl from "@/utils";
import FilterComponent from "@/components/filter-component/FilterComponent";
import SearchBar from "@/components/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { htmlToText } from "html-to-text";

export function ResultList({ apiPostFormData, updatRouteType, apiRoute }) {
  const [filteredData, setFilteredData] = useState();
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(""); // State for capturing error messages
  const router = useRouter();

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
    htmlToText(contentItem.job?.content, {
      wordwrap: 130,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    })
  );

  useEffect(() => {
    setFilteredData(apiPostFormData || []); // Set initial data
  }, [apiPostFormData]);

  const handleSearch = (term) => {
    console.log(apiPostFormData);
    const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());
    const filtered = apiPostFormData.filter((formData) =>
      searchTerms.some((searchTerm) =>
        Object.values(formData.job).some(
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

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  const handleFilter = (filters) => {
    console.log(filters);
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

      const contentMatch = job["job"]["content"]
        .toLowerCase()
        .includes(filters.content.toLowerCase());

      const salaryMatch = job["job"]["content"].match(
        /salary\s*=\s*(\d+)-(\d+)/
      );
      const salaryInRange =
        salaryMatch &&
        filters.salary >= Number(salaryMatch[1]) &&
        filters.salary <= Number(salaryMatch[2]);

      // Age check
      const ageMatch = job["job"]["content"].match(/age\s*=\s*(\d+)-(\d+)/);
      const ageInRange =
        ageMatch &&
        filters.age >= Number(ageMatch[1]) &&
        filters.age <= Number(ageMatch[2]);

      //exprience check
      const exprienceMatch = job["job"]["content"].match(
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

      // Check if all conditions are true
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
      <FilterComponent
        onApplyFilter={handleFilter}
        locations={locations}
        categories={categories}
        departments={departments}
        contentData={contentData}
        dateLabel="Result"
      />
      {/* {error && <p className="text-red-600 mt-2">{error}</p>}{" "} */}
      {/* Display error message if any */}

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
          A list of your Admit Card
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
                  {renderCell(formData?.job?.title)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.update_date)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.job?.description)}
                </TableCell>
                <TableCell className="p-4 text-gray-600 truncate">
                  <a
                    href="#"
                    onClick={() => openContentDialog(formData?.job?.content)}
                    className="text-blue-500 hover:underline"
                  >
                    {renderCell(formData?.job?.content)}
                  </a>
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.job?.slug)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.job?.meta_title)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.job?.meta_description)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.job?.canonical_url)}
                </TableCell>
                <TableCell className="flex justify-end gap-2 p-4">
                  <Button
                    onClick={() => updateFormData(formData.job)}
                    className="bg-blue-500 text-white"
                  >
                    <MdModeEditOutline />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteFormData(formData.job.id)}
                    className="bg-red-500 text-white"
                  >
                    <RiDeleteBin6Line />
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

export const generateMetaData = async (formData) => {
  if (!formData) return {};

  // Define basic metadata fields based on formData
  const metadata = {
    title: formData.title || "Add Job Post",
    description: formData.metaDescription || formData.description || "",
    canonical: formData.canonicalUrl || "",
    metaTags: formData.metaTags
      ? formData.metaTags.split(",").map((tag) => tag.trim())
      : [],
  };

  return {
    title: metadata.title,
    description: metadata.description,
    canonical: metadata.canonical,
    metaTags: metadata.metaTags,
  };
};
