import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import InputSearch from "./drop-down/DropDown";
import { RangeFilter } from "./RangeFilter";
import { Label } from "../ui/label";
import { DatePickerWithRange } from "./CalenderFilter";
const defalutInitialValue = {
  location: "",
  category: "",
  department: "",
  content: "",
  publishDate: "",
  salary: null,
  age: null,
  exprience: null,
};

const FilterComponent = ({
  onApplyFilter,
  locations = [],
  categories = [],
  departments = [],
  contentData = [],
  dateLabel,
}) => {
  const [filters, setFilters] = useState(defalutInitialValue);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [departmentSuggestions, setDepartmentSuggestions] = useState([]);

  const [contentSuggestions, setContentSuggestions] = useState([]);

  const [resetDate, setResetDate] = useState(false);
  const [resetRange, setResetRange] = useState(false);

  const handleInputChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleSearch = (key, value) => {
    if (key === "location") {
      setLocationSuggestions(
        locations.filter((location) =>
          location.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "category") {
      setCategorySuggestions(
        categories.filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "department") {
      setDepartmentSuggestions(
        departments.filter((department) =>
          department.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "content") {
      setContentSuggestions(
        contentData.filter((content) =>
          content.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    handleInputChange(key, value); // Update the filter value
  };

  const applyFilters = () => {
    onApplyFilter(filters);
  };

  const clearFilters = () => {
    setResetDate(true);
    setResetRange(true);
    setFilters(defalutInitialValue);
    setLocationSuggestions([]);
    setCategorySuggestions([]);
    setDepartmentSuggestions([]);
    setContentSuggestions([]);
    onApplyFilter(defalutInitialValue);
  };

  useEffect(() => {
    if (resetDate) setResetDate(false);
    if (resetRange) setResetRange(false);
  }, [resetDate, resetRange]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-5">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputSearch
          placeholder="Location"
          value={filters.location}
          suggestions={locationSuggestions}
          onSearch={(value) => handleSearch("location", value)}
          clearSuggestions={() => setLocationSuggestions([])}
          clear={filters.location === ""}
        />
        <InputSearch
          placeholder="Category"
          value={filters.category}
          suggestions={categorySuggestions}
          onSearch={(value) => handleSearch("category", value)}
          clearSuggestions={() => setCategorySuggestions([])}
          clear={filters.category === ""}
        />
        <InputSearch
          placeholder="Department"
          value={filters.department}
          suggestions={departmentSuggestions}
          onSearch={(value) => handleSearch("department", value)}
          clearSuggestions={() => setDepartmentSuggestions([])}
          clear={filters.department === ""}
        />
        <InputSearch
          placeholder="Education"
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="flex flex-col">
          {/* <Label className="font-semibold text-gray-700 mb-2">
            Salary 10k-100k
          </Label> */}
          <RangeFilter
            min={10000}
            max={100000}
            label="Salary"
            onChange={(value) => {
              //console.log("Salary range selected:", value);
              setFilters({ ...filters, salary: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
        <div className="flex flex-col">
          {/* <Label className="font-semibold text-gray-700 mb-2">Age 15-40</Label> */}
          <RangeFilter
            min={15}
            max={40}
            label="Age"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, age: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
        <div className="flex flex-col">
          {/* <Label className="font-semibold text-gray-700 mb-2">Age 15-40</Label> */}
          <RangeFilter
            min={0}
            max={10}
            label="Exprience"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, exprience: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
        <div className="flex flex-col">
          <Label className="font-semibold text-gray-700 mb-2">
            {dateLabel} Date
          </Label>
          <DatePickerWithRange
            onDateRangeChange={(selectedRange) =>
              handleInputChange("publishDate", selectedRange)
            }
            resetDate={resetDate}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          onClick={applyFilters}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Filters
        </Button>
        <Button
          onClick={clearFilters}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
