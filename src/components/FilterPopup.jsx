import { useState } from "react";

const EMPTY_FILTERS = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

const FilterPopup = ({ onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(EMPTY_FILTERS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Filter Users</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              value={localFilters.firstName}
              onChange={handleChange}
              placeholder="Filter by first name"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              value={localFilters.lastName}
              onChange={handleChange}
              placeholder="Filter by last name"
            />
          </div>

          <div className="form-group form-group-full">
            <label>Email</label>
            <input
              name="email"
              type="text"
              value={localFilters.email}
              onChange={handleChange}
              placeholder="Filter by email"
            />
          </div>

          <div className="form-group form-group-full">
            <label>Department</label>
            <input
              name="department"
              type="text"
              value={localFilters.department}
              onChange={handleChange}
              placeholder="Filter by department"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={handleClear}>
            Clear All
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterPopup;