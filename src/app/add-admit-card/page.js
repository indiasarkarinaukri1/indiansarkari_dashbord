"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AdmitCard = ({ onSubmit, createdBy }) => {
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
    created_by: createdBy,
    updated_by: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // Adjust the endpoint according to your backend setup
    const response = await axios.post("/api/upload", formData);
    return response.data.url; // Assuming the response returns the URL of the uploaded file
  };

  const handleImageUpload = async (file) => {
    const url = await handleFileUpload(file);
    const range = quillRef.current.getEditor().getSelection();
    quillRef.current.getEditor().insertEmbed(range.index, "image", url);
  };

  const handleVideoUpload = async (file) => {
    const url = await handleFileUpload(file);
    const range = quillRef.current.getEditor().getSelection();
    quillRef.current.getEditor().insertEmbed(range.index, "video", url);
  };

  const handleAudioUpload = async (file) => {
    const url = await handleFileUpload(file);
    const range = quillRef.current.getEditor().getSelection();
    quillRef.current.getEditor().insertEmbed(range.index, "audio", url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/add-admit-card", formData);
      onSubmit(response.data);
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
        created_by: createdBy,
        updated_by: "",
      });
    } catch (error) {
      console.error("Error submitting admit card:", error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image", "video", "audio"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = async () => {
            const file = input.files[0];
            await handleImageUpload(file);
          };
          input.click();
        },
        video: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "video/*");
          input.onchange = async () => {
            const file = input.files[0];
            await handleVideoUpload(file);
          };
          input.click();
        },
        audio: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "audio/*");
          input.onchange = async () => {
            const file = input.files[0];
            await handleAudioUpload(file);
          };
          input.click();
        },
      },
    },
  };

  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Create Admit Card</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Short Information
        </label>
        <input
          type="text"
          name="shortInformation"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.shortInformation}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <ReactQuill
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          modules={modules}
          className="bg-gray-100 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          name="slug"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.slug}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Meta Tags
        </label>
        <input
          type="text"
          name="metaTags"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.metaTags}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Meta Description
        </label>
        <textarea
          name="metaDescription"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Canonical URL
        </label>
        <input
          type="text"
          name="canonicalUrl"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.canonicalUrl}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.state}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Categories
        </label>
        <input
          type="text"
          name="categories"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.categories}
          onChange={handleChange}
        />
      </div>

      <input type="hidden" name="created_by" value={formData.created_by} />
      <input type="hidden" name="updated_by" value={formData.updated_by} />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default AdmitCard;
