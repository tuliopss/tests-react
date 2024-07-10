import React from "react";
import "./TextInput.css";
const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      type='search'
      onChange={handleChange}
      value={searchValue}
      className='text-input'
    />
  );
};

export default TextInput;
