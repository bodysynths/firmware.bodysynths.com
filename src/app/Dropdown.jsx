// components/Dropdown.js
import { useState } from "react";

export default function Dropdown({ options, onSelect, curOption, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleClick = (idx) => {
    setIsOpen(false);
    handleSelect(idx);
  };

  return (
    <div className="dropdown space-y-1 w-full">
      <button className="btn w-full" onClick={() => setIsOpen(!isOpen)}>
        {curOption && false ? curOption.title : title}
      </button>
      {isOpen && (
        <ul className="menu dropdown-content bg-white rounded-box z-[1] p-2 space-y-2 w-full shadow">
          {options.map((option, idx) => (
            <li key={idx}>
              <button className="btn" onClick={() => handleClick(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
