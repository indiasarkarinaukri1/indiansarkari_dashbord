import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CategoryForm = ({
  formData,
  handleSubmit,
  setFormData,
  pageName,
  loading,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {pageName} Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Category name <span className="text-red-500">*</span>
            </Label>
            <Input
              name="name"
              placeholder="Enter post title"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              name="slug"
              placeholder="Enter slug (unique)"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Created By <span className="text-red-500">*</span>
            </Label>
            <Input
              name="created_by"
              placeholder="Enter creator's name"
              value={formData.created_by}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Updated By <span className="text-red-500">*</span>
            </Label>
            <Input
              name="updated_by"
              placeholder="Enter creator's name"
              value={formData.updated_by}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200`}
            disabled={loading}
          >
            {loading ? "Saving..." : formData.id ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
