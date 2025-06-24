"use client";
import { useState, useRef, useEffect } from "react";
import { useWatch } from "react-hook-form";
/* Dropdown checkbox for selecting multiple category and languages */
export default function CheckboxDropdown({
  label,
  options,
  register,
  error,
  name,
  control,
}) {
  const [open, setOpen] =
    useState(false); /* handling state if dropdown is open */
  const dropdownRef = useRef(null); /* creating a reference to the dropdown  */

  // Watch the selected values via react-hook-form
  const selectedValues = useWatch({
    control,
    name,
    defaultValue: [],
  });

  /* handling side Effects checking if leftclick is being called to open the dropdown */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col relative w-full " ref={dropdownRef}>
      <label
        className="text-zinc-300 mb-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((opening) => !opening)}
        className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 w-full text-left flex justify-between items-center"
      >
        {/* Handling multiple values selection*/}
        <span className="truncate">
          {selectedValues?.length > 0
            ? selectedValues.join(", ")
            : `Select ${label}`}
        </span>

        {/* rotating the open button */}
        <span
          className={`transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* mapping options in the dropdown  */}
      {open && (
        <div className="absolute z-20 mt-16 w-full bg-zinc-900 border opacity-70 border-zinc-700 rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer text-white"
            >
              <input
                type="checkbox"
                value={option}
                {...register(name, {
                  validate: (value) =>
                    value?.length > 0 ||
                    `Please select at least one ${label.toLowerCase()}`,
                })}
                className="accent-fuchsia-500"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      <p className="text-red-500 text-sm mt-1">{error?.message}</p>
    </div>
  );
}
