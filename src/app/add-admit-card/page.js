"use client";
import JobManagementForm from "@/components/job-management-form";
import React, { useState } from "react";

const apiurl =
  "https://4c8a9b33-9a59-44e9-96a8-5565e100af74-00-2tlr0w1o5f2ne.sisko.replit.dev/api/job-posts";

const AddAdmitCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    shortInformation: "",
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
      const apiResponse = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!apiResponse.ok) throw new Error("Network Response Was Not Ok");

      const result = await apiResponse.json();
      if (result?.success) {
        setLoading(false);
        setFormData({
          title: "",
          date: "",
          shortInformation: "",
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
        optionName="Admit Card"
        formData={formData}
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

export default AddAdmitCard;
