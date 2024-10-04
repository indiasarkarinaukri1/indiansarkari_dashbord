"use client";
import PaperModelForm from "@/components/paper-model-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const ReadingModelForm = () => {
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    postTitle: "",
    category: "",
    subject: "",
    shortDescription: "",
    pdf: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    slug: "",
    createdAt: new Date().toISOString().split("T")[0],
    createdBy: "",
  });
  useEffect(() => {
    if (format) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(format));
        setFormData(parsedData);
      } catch (error) {
        console.log(`Error parsing Format: ${error}`);
      }
    }
  }, [format]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetch(
        formData._id
          ? `/api/update-old-model-paper?id=${formData._id}`
          : "/api/add-old-model-paper",
        {
          method: formData._id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!apiResponse.ok) {
        const responseBody = await apiResponse.json();
        console.error("API Response Error:", responseBody);
        throw new Error("Network Response Was Not Ok");
      } else {
        setFormData({
          postTitle: "",
          category: "",
          subject: "",
          shortDescription: "",
          pdf: "",
          metaTitle: "",
          metaDescription: "",
          canonicalUrl: "",
          slug: "",
          createdAt: new Date().toISOString().split("T")[0],
          createdBy: "",
        });
        setLoading(false);
        router.push("reading-book-model");
      }
    } catch (error) {
      console.error("Error submitting job post:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PaperModelForm
      loading={loading}
      pageName="Reading Book Model"
      formData={formData}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
    />
  );
};

export default ReadingModelForm;
