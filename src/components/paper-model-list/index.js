"use client";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PaperModelList = ({ apiPostFormData, updateRoute }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const renderCell = (data) => {
    return data ? data : "";
  };
  const handelDeleteModel = async (getCurrentID) => {
    try {
      const apiResponse = await fetch(
        `/api/delete-old-model-paper?id=${getCurrentID}`,
        {
          method: "DELETE",
        }
      );
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
      else console.error(result?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditModel = async (getCurrentModelItem) => {
    const query = encodeURIComponent(JSON.stringify(getCurrentModelItem));
    router.push(`${updateRoute}?format=${query}`);
  };

  const handelOpenPdf = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setOpenDialog(true);
  };
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
      <Table className="min-w-full bg-white rounded-md border border-gray-200">
        <TableCaption className="text-gray-600 font-semibold text-lg py-3">
          A list of your Job Posts
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Post Title
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Category
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Subject
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Short Description
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              PDF
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Meta Title
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Meta Description
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Canonical URL
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Slug
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Created At
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2">
              Created By
            </TableHead>
            <TableHead className="p-4 font-bold text-gray-700 border-b-2 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {apiPostFormData.data &&
            apiPostFormData.data.length > 0 &&
            apiPostFormData.data.map((formData) => (
              <TableRow
                key={formData._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell className="p-4 text-gray-800">
                  {renderCell(formData?.postTitle)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.category)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.subject)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.shortDescription)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.pdf) ? (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger>
                        <a
                          href="#"
                          onClick={() => handelOpenPdf(formData.pdf)}
                          className="text-blue-500 hover:underline"
                        >
                          <FaFilePdf className="inline-block mr-1" />
                          View PDF
                        </a>
                      </DialogTrigger>
                      {openDialog && (
                        <DialogContent
                          onClick={() => setOpenDialog(false)}
                          className="min-w-[1000px]"
                        >
                          <DialogHeader>
                            <DialogTitle>Pdf Preview</DialogTitle>
                          </DialogHeader>
                          <div className="min-h-[450px]">
                            <iframe
                              src={`${selectedPdf}#toolbar=0`}
                              className="min-w-full min-h-full border-0"
                              title="PDF Preview"
                            />
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  ) : (
                    "No PDF Available"
                  )}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.metaTitle)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.metaDescription)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.canonicalUrl)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.slug)}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.createdAt.split("T")[0])}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {renderCell(formData?.createdBy)}
                </TableCell>
                <TableCell className="p-4 text-gray-600 text-right">
                  <Button onClick={() => handelEditModel(formData)}>
                    <MdModeEditOutline />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handelDeleteModel(formData?._id)}
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

export default PaperModelList;
