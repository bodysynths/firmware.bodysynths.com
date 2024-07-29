// components/Dropdown.js
import { useState } from "react";

export default function Dropdown({ options, onSelect, curOption }) {
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
    <div className="dropdown">
      <button className="btn m-1" onClick={() => setIsOpen(true)}>
        {curOption ? curOption.title : "Select Firmware"}
      </button>
      {/* <button onClick={toggleDropdown} className="btn btn-primary">
        {curOption ? curOption.title : "Select Firmware"}
      </button> */}

      {isOpen && (
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {options.map((option, idx) => (
            <li key={idx}>
              <button onClick={() => handleClick(idx)}>{option.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
