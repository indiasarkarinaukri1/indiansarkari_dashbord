import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

const InputSearch = ({
  onSearch,
  placeholder,
  suggestions,
  value,
  clearSuggestions,
  clear,
}) => {
  const [searchValue, setSearchValue] = useState(value || "");

  useEffect(() => {
    if (clear) setSearchValue("");
  }, [clear]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    onSearch(suggestion); // Apply the suggestion
    clearSuggestions();
  };

  return (
    <div className="flex justify-center my-5">
      <div className="relative w-full max-w-md">
        <Input
          onChange={handleInputChange}
          value={searchValue}
          type="text"
          placeholder={placeholder}
          className="rounded-full bg-orange-100 px-10"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch className="text-gray-500 h-5 w-5" />
        </span>
        {searchValue && suggestions.length > 0 && (
          <ScrollArea
            className="absolute w-full max-h-60 mt-2 border border-gray-200 rounded-md shadow-lg bg-white z-50"
            style={{ top: "100%", position: "absolute" }}
          >
            <ul className="divide-y divide-gray-200">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default InputSearch;
