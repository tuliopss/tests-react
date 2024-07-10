import React from "react";
import "./Button.css";
const Button = ({ text, handleClick, disabled }) => {
  return (
    <button disabled={disabled} className='button' onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
