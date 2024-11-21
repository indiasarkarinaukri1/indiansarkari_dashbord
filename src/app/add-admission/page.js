"use client";
import JobManagementForm from "@/components/job-management-form";
import apiurl from "@/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddAdmission = () => {
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    content: "",
    slug: "",
    metaTags: "",
    metaDescription: "",
    canonicalUrl: "",
    state_id: "",
    category_id: "",
    department_id: "",
    subcategory_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (format) {
      const parsedData = JSON.parse(decodeURIComponent(format));
      if (parsedData.date) {
        const date = new Date(parsedData.date);
        parsedData.date = date.toISOString().split("T")[0];
      }
      setFormData(parsedData);
    }
  }, [format]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedFormData = {
      ...formData,
      content: formData.content,
    };

    try {
      const apiResponse = await fetch(
        formData.id
          ? `${apiurl}/admission/${formData.id}`
          : `${apiurl}/admission`,
        {
          method: formData.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!apiResponse.ok) throw new Error("Network Response Was Not Ok");
      else {
        setLoading(false);
        setFormData({
          title: "",
          date: "",
          description: "",
          content: "",
          slug: "",
          metaTags: "",
          metaDescription: "",
          canonicalUrl: "",
          state_id: "",
          category_id: "",
          department_id: "",
          subcategory_id: "",
        });
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while saving the job.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <JobManagementForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
        link="admission"
        optionName="Admission Post"
      />
    </div>
  );
};

export default AddAdmission;

// export const generateMetaData = async (formData) => {
//   if (!formData) return {};

//   // Define basic metadata fields based on formData
//   const metadata = {
//     title: formData.title || "Add Job Post",
//     description: formData.metaDescription || formData.description || "",
//     canonical: formData.canonicalUrl || "",
//     metaTags: formData.metaTags
//       ? formData.metaTags.split(",").map((tag) => tag.trim())
//       : [],
//   };

//   return {
//     title: metadata.title,
//     description: metadata.description,
//     canonical: metadata.canonical,
//     metaTags: metadata.metaTags,
//   };
// };
