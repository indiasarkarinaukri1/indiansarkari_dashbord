import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Dropdown from "./dropdown/Dropdown";
import apiurl from "@/utils";
import JoditEditorComponent from "../jodit-editor";

const JobManagementForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  error,
  link,
  loading,
  optionName,
}) => {
  const router = useRouter();
  const [validationError, setValidationError] = useState(null);
  const editor = useRef(null);
  const validateAndSubmit = (event) => {
    event.preventDefault();
    const { title, date, slug } = formData;

    if (!title || !date || !slug) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    setValidationError(null);
    handleSubmit(event);
    router.push(link);
  };

  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={validateAndSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Create {optionName}</h2>

      {validationError && (
        <p className="text-red-500 mb-4">{validationError}</p>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          className="mt-1 block outline-none w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          name="description"
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <JoditEditorComponent
          content={formData.content}
          setContent={(newContent) =>
            setFormData((prev) => ({ ...prev, content: newContent }))
          }
          editor={editor}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          name="slug"
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          className="mt-1 block w-full border outline-none border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.canonicalUrl}
          onChange={handleChange}
        />
      </div>

      <Dropdown
        label="State"
        endpoint={`${apiurl}/state`}
        formData={formData}
        setFormData={setFormData}
        dataKey="state_id"
      />

      <Dropdown
        label="Category"
        endpoint={`${apiurl}/category`}
        formData={formData}
        setFormData={setFormData}
        dataKey="category_id"
      />

      <Dropdown
        label="Subcategory"
        endpoint={`${apiurl}/subcategory`}
        formData={formData}
        setFormData={setFormData}
        dataKey="subcategory_id"
      />

      <Dropdown
        label="Department"
        endpoint={`${apiurl}/depertment`}
        formData={formData}
        setFormData={setFormData}
        dataKey="department_id"
      />

      <button
        type="submit"
        className={`w-full ${
          loading ? "bg-gray-400" : "bg-blue-600"
        } text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200`}
        disabled={loading}
      >
        {loading ? "Saving..." : formData.id ? "Update" : "Create"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default JobManagementForm;
