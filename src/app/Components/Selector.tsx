import React, { useState, useEffect, useRef } from 'react';

interface SelectorProps {
  options: string[];
  selectedOptions: string | string[];
  onChange: (selected: string | string[]) => void;
  multiSelect?: boolean;
  placeholder?: string;
}

const Selector: React.FC<SelectorProps> = ({
  options,
  selectedOptions,
  onChange,
  multiSelect = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelection = (option: string) => {
    if (multiSelect) {
      if (Array.isArray(selectedOptions)) {
        if (selectedOptions.includes(option)) {
          onChange(selectedOptions.filter((item) => item !== option));
        } else {
          onChange([...selectedOptions, option]);
        }
      } else {
        onChange([option]);
      }
    } else {
      onChange(option);
    }
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Close dropdown if clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative  w-full">
      <button
        type="button"
        className="border border-gray-300 rounded-md p-2 w-[100%] text-gray-800 text-base bg-white focus:outline-none"
        onClick={toggleDropdown}
      >
        {Array.isArray(selectedOptions) && selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : (selectedOptions as string) || placeholder}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-40">
          {options.map((option) => (
            <div
              key={option}
              className={`p-2 cursor-pointer hover:bg-gray-100 text-sm font-normal ${
                (Array.isArray(selectedOptions) && selectedOptions.includes(option)) ||
                selectedOptions === option
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => handleSelection(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
