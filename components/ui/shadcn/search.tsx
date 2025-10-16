"use client";

import React, { useState, useEffect } from "react";

 interface SearchProps {
  onSubmit: (value: string) => void;
  onClear?: () => void;
  value?: string;
  placeholder?: string;
}
 export function SearchInput({ onSubmit, onClear, value, placeholder = "Search..." }: SearchProps) {

  const [searchValue, setSearchValue] = useState(value || "");

    useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue); 
  onSubmit(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchValue);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto sm:max-w-none sm:w-[320px]">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            onChange={handleSearchOnChange}
            value={searchValue}
            type="search"
            className="w-full h-[40px] pl-4 pr-10 py-2 text-sm border border-[#E5E7EB] rounded-[48px] outline-none"
            placeholder={placeholder}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#9CA3AF]"
            >
              <path
                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}
