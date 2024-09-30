"use client";
import JobManagementForm from "@/components/job-management-form";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const apiurl =
  "https://2aca07c8-73ea-4f73-82d7-9bcd869a37fb-00-efcuu5mloosk.sisko.replit.dev/api/job-posts";

const AddJobPost = () => {
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    ShortInformation: "",
    content: "",
    slug: "",
    metaTags: "",
    metaDescription: "",
    canonicalUrl: "",
    state: "",
    categories: "",
    created_by: "",
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

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(apiurl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.url;
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Please try again.");
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(apiurl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const fileUrl = data.url;
      const linkTag = `<a href="${fileUrl}" target="_blank">${file.name}</a>`;
      editor.commands.insertContent(linkTag);
    } catch (err) {
      console.error("File upload failed:", err);
      setError("File upload failed. Please try again.");
    }
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
        formData.id ? `${apiurl}/${formData.id}` : apiurl,
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
          ShortInformation: "",
          content: "",
          slug: "",
          metaTags: "",
          metaDescription: "",
          canonicalUrl: "",
          state: "",
          categories: "",
          created_by: "",
        });
        setError("");
      }
    } catch (error) {
      console.error("Error submitting job post:", error);
      setError("Failed to submit the job post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <JobManagementForm
        optionName="Job Post"
        formData={formData}
        link="job-post"
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
        handleImageUpload={handleImageUpload}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default AddJobPost;
