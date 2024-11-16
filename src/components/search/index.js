import React, { useState } from "react";
import { Input } from "../ui/input";
import { BsSearch } from "react-icons/bs";
const debounce = (fn, delay) => {
  let timeOutID;
  return (...args) => {
    clearTimeout(timeOutID);
    timeOutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const handelInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debounceSearch(value);
  };
  const debounceSearch = debounce((value) => {
    onSearch(value);
  }, 300);
  return (
    <div className="flex justify-center my-5">
      <div className="relative w-full max-w-md">
        <Input
          onChange={handelInputChange}
          value={searchValue}
          type="text"
          placeholder="Search Here"
          className="rounded-full bg-orange-100 px-10"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch className="text-gray-500 h-5 w-5" />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
