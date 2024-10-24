"use client";
import CategoryForm from "@/components/category-form";
import apiurl from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
const AddStateManagement = () => {
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    created_by: "",
    updated_by: "",
  });
  useEffect(() => {
    if (format) {
      try {
        const paresdData = JSON.parse(decodeURIComponent(format));
        setFormData(paresdData);
      } catch (error) {
        console.log("Error parsing format", error);
      }
    }
  }, [format]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetch(
        formData.id ? `${apiurl}/state/${formData?.id}` : `${apiurl}/state`,
        {
          method: formData.id ? "PUT" : "POST",
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
          name: "",
          slug: "",
          createdBy: "",
          updatedBy: "",
        });
        setLoading(false);
        router.push("state-management");
      }
    } catch (error) {
      console.error("Error submitting Category:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CategoryForm
      pageName="State Management"
      formData={formData}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
      loading={loading}
    />
  );
};

export default AddStateManagement;
