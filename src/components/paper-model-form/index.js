import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const PaperModelForm = ({
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
              Post Title <span className="text-red-500">*</span>
            </Label>
            <Input
              name="postTitle"
              placeholder="Enter post title"
              value={formData.postTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <Input
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Short Description</Label>
            <Textarea
              name="shortDescription"
              placeholder="Enter short description"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">PDF URL</Label>
            <Input
              name="pdf"
              placeholder="Enter PDF URL"
              value={formData.pdf}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Meta Title</Label>
            <Input
              name="metaTitle"
              placeholder="Enter meta title"
              value={formData.metaTitle}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Meta Description</Label>
            <Textarea
              name="metaDescription"
              placeholder="Enter meta description"
              value={formData.metaDescription}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Canonical URL</Label>
            <Input
              name="canonicalUrl"
              placeholder="Enter canonical URL"
              value={formData.canonicalUrl}
              onChange={handleInputChange}
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
            <Label className="text-sm font-medium">Created At</Label>
            <Input
              name="createdAt"
              placeholder="Created At"
              value={formData.createdAt}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Created By <span className="text-red-500">*</span>
            </Label>
            <Input
              name="createdBy"
              placeholder="Enter creator's name"
              value={formData.createdBy}
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
            {loading ? "Saving..." : formData._id ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaperModelForm;
