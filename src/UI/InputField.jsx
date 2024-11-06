/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const InputField = ({ label, value, onChange, type = "text" }) => {
  const [inputValue, setInputValue] = useState(value);
  const debounceDelay = 500;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, value, onChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default InputField;
