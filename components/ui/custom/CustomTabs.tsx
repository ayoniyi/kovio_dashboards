"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

interface CustomTabsProps {
  tabs: string[];
  defaultActiveTab?: string;
  onChange?: (tab: string) => void;
  className?: string;
}

export default function CustomTabs({
  tabs,
  defaultActiveTab,
  onChange,
  className = "",
}: CustomTabsProps) {
  const defaultTab = tabs[0];
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || defaultTab);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultActiveTab && defaultActiveTab !== activeTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false); // Close dropdown when selecting
    if (onChange) {
      onChange(tab);
    }
  };

  const { setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      tabSelection: activeTab
    }
  });

  const tabSelection = watch("tabSelection");

  useEffect(() => {
    if (tabSelection && tabSelection !== activeTab) {
      handleTabChange(tabSelection);
    }
  }, [tabSelection]);

  // Update form value when tab changes
  useEffect(() => {
    setValue("tabSelection", activeTab);
  }, [activeTab, setValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Tabs */}
      <div className={`hidden lg:flex justify-between bg-[#F1F5F9] my-6 font-semibold lg:font-medium text-sm lg:text-base leading-6 tracking-extra-wide text-kv-semi-black rounded-full overflow-hidden p-1 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-1 lg:py-2 px-2 lg:px-6 text-center flex-auto transition-colors ${
              activeTab === tab ? 'bg-white rounded-full shadow-sm' : ''
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className={`lg:hidden relative my-6 ${className}`} ref={dropdownRef} style={{ zIndex: 40 }}>
        <button
          className="w-full bg-white outline-none border font-normal text-sm leading-6 tracking-extra-wide text-kv-semi-black rounded-full p-3 flex items-center justify-between shadow-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span>{activeTab}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full z-40 left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`w-full text-left px-4 py-3 text-sm font-normal text-[#1E293B] hover:bg-kv-secondary transition-colors border-b border-gray-50 last:border-b-0 ${
                  activeTab === tab ? 'bg-kv-primary hover:bg-kv-primary text-white font-normal' : ''
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}