// Array of job management menu items
export const jobManagementItems = [
  { label: "Job Post", path: "job-post" },
  { label: "Admit Card", path: "admit-card" },
  { label: "Answer Key", path: "answer-key" },
  { label: "Result", path: "result" },
  { label: "Old Paper Model", path: "old-paper-model" },
  { label: "Reading Book Model", path: "reading-book-model" },
  { label: "Category", path: "category-management" },
  { label: "SubCategory", path: "sub-category-management" },
  { label: "State", path: "state-management" },
  { label: "Department", path: "department-management" },
];

const apiurl = "https://newindiansarkari-production.up.railway.app";

export const handleFilter = (filters) => {
  // Helper function to check a range condition
  const isInRange = (value, rangeStart, rangeEnd) =>
    value >= rangeStart && value <= rangeEnd;

  // Helper function to parse range filters from content
  const parseRange = (content, key) => {
    const match = content.match(new RegExp(`${key}\\s*=\\s*(\\d+)-(\\d+)`));
    return match ? { start: Number(match[1]), end: Number(match[2]) } : null;
  };

  // Main filter logic
  const filtered = apiPostFormData.filter((job) => {
    const {
      location,
      department,
      category,
      publishDate,
      salary,
      age,
      exprience,
      content,
    } = filters;

    // Match location
    const locationMatch = job?.State?.name
      ?.toLowerCase()
      .includes(location?.toLowerCase() || "");

    // Match department
    const departmentMatch = job?.Depertment?.name
      ?.toLowerCase()
      .includes(department?.toLowerCase() || "");

    // Match category
    const categoryMatch = job?.Category?.name
      ?.toLowerCase()
      .includes(category?.toLowerCase() || "");

    // Match publish date
    const jobDate = job?.created_at ? new Date(job.created_at) : null;
    const dateFrom = publishDate?.from ? new Date(publishDate.from) : null;
    const dateTo = publishDate?.to ? new Date(publishDate.to) : null;
    const publishDateMatch =
      dateFrom && dateTo ? jobDate >= dateFrom && jobDate <= dateTo : true;

    // Match content
    const contentMatch = job?.content
      ?.toLowerCase()
      .includes(content?.toLowerCase() || "");

    // Match salary range
    const salaryRange = parseRange(job?.content || "", "salary");
    const salaryMatch = salary
      ? salaryRange && isInRange(salary, salaryRange.start, salaryRange.end)
      : true;

    // Match age range
    const ageRange = parseRange(job?.content || "", "age");
    const ageMatch = age
      ? ageRange && isInRange(age, ageRange.start, ageRange.end)
      : true;

    // Match experience range
    const exprienceRange = parseRange(job?.content || "", "exprience");
    const exprienceMatch = exprience
      ? exprienceRange &&
        isInRange(exprience, exprienceRange.start, exprienceRange.end)
      : true;

    // Combine all conditions
    return (
      locationMatch &&
      departmentMatch &&
      categoryMatch &&
      contentMatch &&
      publishDateMatch &&
      salaryMatch &&
      ageMatch &&
      exprienceMatch
    );
  });

  setFilteredData(filtered);
};

export default apiurl;
