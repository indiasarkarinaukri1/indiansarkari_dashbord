import { useRouter } from "next/navigation";
import RichTextEditor from "../text-Editor";
import { useState } from "react";

const JobManagementForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  error,
  link,
  loading,
  handleImageUpload,
  handleFileUpload,
  optionName,
}) => {
  const router = useRouter();
  const [validationError, setValidationError] = useState(null);

  const validateAndSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      date,

      slug,

      created_by,
    } = formData;

    if (!title || !date || !slug || !created_by) {
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
          name="ShortInformation"
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.ShortInformation}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <RichTextEditor
          content={formData.content}
          setContent={(content) =>
            setFormData((prev) => ({ ...prev, content }))
          }
          handleImageUpload={handleImageUpload}
          handleFileUpload={handleFileUpload}
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          className="mt-1 block outline-none w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.categories}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Created BY
        </label>
        <input
          type="text"
          name="created_by"
          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={formData.created_by}
          onChange={handleChange}
        />
      </div>

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
