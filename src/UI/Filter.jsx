/* eslint-disable react/prop-types */
import InputField from "./InputField";

const Filter = ({ filterParams, onFilterChange }) => (
  <div className="filter-container">
    <InputField
      label="Title"
      value={filterParams.title}
      onChange={(value) => onFilterChange("title", value)}
    />
    <InputField
      label="Author"
      value={filterParams.author}
      onChange={(value) => onFilterChange("author", value)}
    />
  </div>
);

export default Filter;
