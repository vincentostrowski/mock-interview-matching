import { useState, useRef, useEffect } from "react";

const DropDown = ({ options, setOption }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsDropdownOpen(false);
    setOption(option);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block w-40" ref={dropdownRef}>
      {/* Selected option / Dropdown toggle */}
      <div
        onClick={toggleDropdown}
        className="bg-white border border-gray-300 rounded-md py-2 px-4 cursor-pointer"
      >
        {selectedValue ? (
          <span>{selectedValue}</span>
        ) : (
          <span>Select an option</span>
        )}
      </div>

      {/* Dropdown options */}
      {isDropdownOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
