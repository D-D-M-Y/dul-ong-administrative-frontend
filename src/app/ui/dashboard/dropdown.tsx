'use client'

import { useState } from 'react'; // Import useState hook

  const Dropdown = ({ options = ["Daily", "Weekly", "Monthly", "Annually"] }) => {
    const [isOpen, setIsOpen] = useState(false); // Use state for dropdown visibility

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle isOpen state on click
  };

  return (
    <div className="inline-block">
      <button onClick={handleClick}>{options[0]}</button> {<img src="/icons/down-arrow.svg" alt="Filler Image" className="h-4 w-4 rounded-md inline-block"></img> }  
      {isOpen && (
        <ul className="rounded-lg absolute top-full left-0 bg-white shadow-md">
          {options.map((option) => (
            <li key={option} className="rounded-md py-2 px-4 hover:bg-gray-200">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown; 
