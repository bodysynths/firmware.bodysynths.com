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
    <div className="dropdown space-x-1 dropdown-right">
      <button
        className="btn btn-primary btn-outline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {curOption && false ? curOption.title : title}
      </button>
      {/* <button onClick={toggleDropdown} className="btn btn-primary">
        {curOption ? curOption.title : "Select Firmware"}
      </button> */}

      {isOpen && (
        <ul className="menu dropdown-content bg-black rounded-box z-[1] p-2 space-y-2">
          {options.map((option, idx) => (
            <li key={idx}>
              <button
                className="btn btn-primary btn-outline"
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
