/* eslint-disable react/prop-types */
import { useRef } from "react";

const InputField = ({ label, value, onChange, type = "text" }) => {
  const inputRef = useRef(value);

  const handleChange = () => {
    onChange(inputRef.current.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input
        ref={inputRef}
        type={type}
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
