"use client";

import { useState } from "react"; // Import useState hook

const Dropdown = ({ options = ["Daily", "Weekly", "Monthly", "Annually"] }) => {
  const [isOpen, setIsOpen] = useState(false); // Use state for dropdown visibility //shows the options
  const [selectedOption, setSelectedOption] = useState<string>(options[0]); // tracks what you click from the options

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle isOpen state on click
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); //toggles update to the option chosen
    setIsOpen(false); //closes after clicking an option
  };

  return (
    <div className="inline-block relative">
      <button onClick={handleClick} className="flex items-center">
        {selectedOption} {/* changes the word */}
        <img
          src="/icons/down-arrow.svg"
          alt="Filler Image"
          className="h-4 w-4 rounded-md ml-2"
        />
      </button>
      {isOpen && (
        <ul className="rounded-lg absolute top-full left-0 bg-white shadow-md mt-1 dropdown">
          {options.map((option) => (
            <li
              key={option}
              className={`rounded-md py-2 px-4 hover:bg-gray-200 cursor-pointer ${
                option === selectedOption ? "bg-gray-100" : "" // the option will become selectedOption after clicking
              }`}
              onClick={() => handleOptionClick(option)} // uses the useState function
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;